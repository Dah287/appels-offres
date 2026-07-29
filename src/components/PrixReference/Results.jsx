import { useMemo } from 'react';
import * as XLSX from 'xlsx';
import {
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Avatar, List, ListItem,
  ListItemIcon, ListItemText, Button, Tooltip
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Warning as WarningIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Results = ({ data }) => {
  const { rankedOffers, rejectedOffers } = useMemo(() => {
    if (!data?.ranking || !data?.prixReference) return { rankedOffers: [], rejectedOffers: data?.rejected || [] };
    const referencePrice = data.prixReference;
    const offers = data.ranking;
    const belowOrEqual = offers.filter(o => o.montant <= referencePrice);
    const above = offers.filter(o => o.montant > referencePrice);
    const sortByProximity = (arr) => [...arr].sort((a, b) => Math.abs(a.montant - referencePrice) - Math.abs(b.montant - referencePrice));
    const sortedBelow = sortByProximity(belowOrEqual);
    const sortedAbove = sortByProximity(above);
    const allRanked = [...sortedBelow, ...sortedAbove];
    const ranked = allRanked.map((offer, idx) => ({ ...offer, rang: idx + 1, distanceToReference: offer.montant - referencePrice }));
    return { rankedOffers: ranked, rejectedOffers: data.rejected || [] };
  }, [data?.ranking, data?.prixReference, data?.rejected]);

  const formatMoney = (val) => new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(val).replace('MAD', 'DH');

  const exportToExcel = () => {
    if (!data) return;
    const workbook = XLSX.utils.book_new();
    
    const summaryData = [
      ['Analyse des Offres & Prix de Référence'],
      [],
      ['Prix de référence', formatMoney(data.prixReference)],
      ['Type de marché', data.type === 'TRAVAUX' ? 'Travaux' : 'Services/Fournitures'],
      [],
      ['Seuils appliqués (Décret n° 2-22-431)'],
      ['Offre excessive', '> +20% estimation (tous marchés)'],
      ['Offre anormalement basse (Travaux)', '< -20% estimation'],
      ['Offre anormalement basse (Services)', '< -25% estimation'],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Résumé');
    
    if (rankedOffers.length > 0) {
      const rankingData = [
        ['Rang', 'Entreprise', 'Montant (DH)', 'Écart vs Référence (%)', 'Position']
      ];
      rankedOffers.forEach(r => {
        rankingData.push([
          `${r.rang}er`,
          r.entreprise || 'N/A',
          formatMoney(r.montant),
          `${(r.ecartPercentReference || 0) > 0 ? '+' : ''}${(r.ecartPercentReference || 0).toFixed(2)}%`,
          r.montant <= data.prixReference ? '≤ Référence' : '> Référence'
        ]);
      });
      const rankingSheet = XLSX.utils.aoa_to_sheet(rankingData);
      rankingSheet['!cols'] = [
        { wch: 6 }, { wch: 35 }, { wch: 18 }, { wch: 20 }, { wch: 15 }
      ];
      XLSX.utils.book_append_sheet(workbook, rankingSheet, 'Classement');
    }
    
    if (rejectedOffers.length > 0) {
      const rejectedData = [
        ['Entreprise', 'Montant (DH)', 'Raison du rejet']
      ];
      rejectedOffers.forEach(r => {
        rejectedData.push([
          r.entreprise || 'N/A',
          formatMoney(r.montant),
          r.raisonRejet || 'Hors tolérance réglementaire'
        ]);
      });
      const rejectedSheet = XLSX.utils.aoa_to_sheet(rejectedData);
      rejectedSheet['!cols'] = [
        { wch: 35 }, { wch: 18 }, { wch: 50 }
      ];
      XLSX.utils.book_append_sheet(workbook, rejectedSheet, 'Écartées');
    }
    
    const safeRef = (data.referenceMarche || 'analyse').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `Analyse_Offres_${safeRef}_${new Date().toISOString().slice(0,10)}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const exportToPDF = () => {
    if (!data) return;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    doc.setFontSize(18);
    doc.setTextColor(0, 100, 0);
    doc.text("Analyse des Offres & Prix de Référence", pageWidth / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Prix de référence : ${formatMoney(data.prixReference)}`, pageWidth / 2, y, { align: "center" });
    y += 12;

    if (rankedOffers.length > 0) {
      doc.setFontSize(14);
      doc.text("Classement des offres valides", 14, y);
      y += 6;
      const tableColumn = ["Rang", "Entreprise", "Montant (DH)", "Écart %"];
      const tableRows = rankedOffers.map(r => [
        `${r.rang}er`,
        r.entreprise,
        formatMoney(r.montant),
        `${r.ecartPercentReference > 0 ? '+' : ''}${r.ecartPercentReference.toFixed(2)}%`,
        r.montant <= data.prixReference ? "≤ Réf." : "> Réf."
      ]);
      autoTable(doc, {
        startY: y,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [0, 100, 0], textColor: 255 },
        margin: { left: 14, right: 14 }
      });
      y = doc.lastAutoTable.finalY + 10;
    }

    if (rejectedOffers.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(200, 0, 0);
      doc.text("Offres écartées", 14, y);
      doc.setTextColor(0, 0, 0);
      y += 6;
      const tableColumnRej = ["Entreprise", "Montant (DH)", "Raison"];
      const tableRowsRej = rejectedOffers.map(r => [
        r.entreprise,
        formatMoney(r.montant),
        r.raisonRejet || "Hors tolérance"
      ]);
      autoTable(doc, {
        startY: y,
        head: [tableColumnRej],
        body: tableRowsRej,
        theme: 'striped',
        headStyles: { fillColor: [200, 0, 0], textColor: 255 },
        margin: { left: 14, right: 14 }
      });
    }

    doc.save(`resultats_${data.prixReference || 'analyse'}.pdf`);
  };

  if (!data) return null;

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ bgcolor: 'success.main', color: 'white', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'white', color: 'success.main' }}><TrophyIcon /></Avatar>
          <Typography variant="h6" fontWeight="bold">📊 Résultats & Classement</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button variant="contained" sx={{ bgcolor: 'white', color: 'success.main', '&:hover': { bgcolor: '#f5f5f5' } }} startIcon={<ExcelIcon />} onClick={exportToExcel} size="small">Export Excel</Button>
          <Button variant="contained" sx={{ bgcolor: 'white', color: 'success.main', '&:hover': { bgcolor: '#f5f5f5' } }} startIcon={<PdfIcon />} onClick={exportToPDF} size="small">Export PDF</Button>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
<Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#e3f2fd', border: '2px solid', borderColor: 'primary.main', textAlign: 'center' }}>
  <Typography variant="body2" color="primary" fontWeight="medium">⭐ Prix de référence calculé</Typography>
  <Typography variant="h4" fontWeight="bold" color="primary.main">{formatMoney(data.prixReference)}</Typography>
  
  {/* Ajout de la moyenne des offres valides */}
  {data.moyenneValides && (
    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="text.secondary">Moyenne des offres valides :</Typography>
      <Typography variant="h6" fontWeight="bold" color="primary">{formatMoney(data.moyenneValides)}</Typography>

    </Box>
  )}
  
  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>Selon le décret n° 2-22-431</Typography>
</Paper>

        {rankedOffers.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="h6" fontWeight="bold"> Classement des offres valides</Typography>
              <Chip label={`${rankedOffers.length} offre${rankedOffers.length > 1 ? 's' : ''}`} size="small" color="primary" variant="outlined" />
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead sx={{ bgcolor: 'primary.main' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white', width: 70 }}>Rang</TableCell>
                    <TableCell sx={{ color: 'white' }}>Entreprise</TableCell>
                    <TableCell sx={{ color: 'white' }} align="right">Montant</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">Écart %</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">Position</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rankedOffers.map((r) => (
                    <TableRow key={r.entreprise} hover sx={{ bgcolor: r.rang === 1 ? '#e8f5e9' : 'inherit', borderLeft: r.rang === 1 ? '4px solid' : undefined, borderColor: r.rang === 1 ? 'success.main' : undefined }}>
                      <TableCell><Chip label={`${r.rang}er`} size="small" color={r.rang === 1 ? 'success' : 'default'} sx={{ fontWeight: 'bold' }} /></TableCell>
                      <TableCell><Typography fontWeight={r.rang === 1 ? 'bold' : 'normal'}>{r.entreprise}{r.rang === 1 && <Typography component="span" color="success.main" sx={{ ml: 1, fontSize: '0.75rem' }}>✓ Retenu</Typography>}</Typography></TableCell>
                      <TableCell align="right"><Typography fontWeight="bold">{formatMoney(r.montant)}</Typography></TableCell>
                      <TableCell align="center"><Chip label={`${r.ecartPercentReference > 0 ? '+' : ''}${r.ecartPercentReference.toFixed(2)}%`} size="small" color={r.ecartPercentReference > 0 ? 'warning' : 'success'} variant="outlined" /></TableCell>
                      <TableCell align="center"><Chip icon={r.montant <= data.prixReference ? <TrendingDownIcon /> : <TrendingUpIcon />} label={r.montant <= data.prixReference ? '≤ Réf.' : '> Réf.'} size="small" color={r.montant <= data.prixReference ? 'success' : 'warning'} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {rejectedOffers.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <WarningIcon color="error" />
              <Typography variant="h6" fontWeight="bold" color="error"> Offres écartées</Typography>
              <Chip label={`${rejectedOffers.length} écartée${rejectedOffers.length > 1 ? 's' : ''}`} size="small" color="error" variant="outlined" />
            </Box>
            <List>
              {rejectedOffers.map((r, i) => (
                <ListItem key={i} sx={{ bgcolor: '#ffebee', borderLeft: '4px solid red', mb: 1, borderRadius: 1 }}>
                  <ListItemIcon><WarningIcon color="error" /></ListItemIcon>
                  <ListItemText 
                    primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}><Typography fontWeight="bold">{r.entreprise}</Typography><Typography variant="body2" color="text.secondary">{formatMoney(r.montant)}</Typography></Box>} 
                    secondary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}><WarningIcon fontSize="small" color="error" /><Typography variant="caption" color="error.dark">{r.raisonRejet || 'Hors tolérance réglementaire'}</Typography></Box>} 
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {rankedOffers.length === 0 && rejectedOffers.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>ℹ️ Aucune offre à analyser pour le moment.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Results;