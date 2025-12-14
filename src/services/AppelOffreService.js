import axios from "axios";

const AppelOffre_BASE_REST_API_URL = "http://localhost:8080/api/v1/appelOffre";



class AppelOffreService{

    
 
getAllAppelOffre(entite, typeMarche, fitre, visa) {



  let url = AppelOffre_BASE_REST_API_URL + '?';

  if (entite && entite !== "ENTITE") {
    url += `entite=${encodeURIComponent(entite)}&`;
  }

  if (typeMarche && typeMarche !== "TYPE MARCHE") {
    url += `typeMarche=${encodeURIComponent(typeMarche)}&`;
  }

  if (fitre && fitre !== "Filre") {
    url += `fitre=${encodeURIComponent(fitre)}&`;
  }

  if (visa && visa !== "Visa") {
    url += `visa=${encodeURIComponent(visa)}&`;
  }

  if (url.endsWith("&")) {
    url = url.slice(0, -1);
  }

  console.log(url);

  return axios.get(url, {
    headers: {
      exercice: sessionStorage.getItem("exercice")
    }
  });
}



createAppelOffre(appelOffre){
    return axios.post(AppelOffre_BASE_REST_API_URL,appelOffre)
}


getappelOffreById(appelOffre){
    return axios.get(AppelOffre_BASE_REST_API_URL + '/' + appelOffre);
}

updateappelOffre(appelOffreId, appelOffre){
    return axios.put(AppelOffre_BASE_REST_API_URL + '/' +appelOffreId, appelOffre);
}
updateappelOffrerecapp(appelOffreId, appelOffre){
  return axios.put(AppelOffre_BASE_REST_API_URL + '/update/' +appelOffreId, appelOffre);
}

deleteappelOffre(appelOffreId){
    return axios.delete(AppelOffre_BASE_REST_API_URL + '/' + appelOffreId);
}
getDashboard(entite) {
  return axios.get(AppelOffre_BASE_REST_API_URL + '/dashboards', {
    params: { entite },
    headers: {
      exercice: sessionStorage.getItem("exercice")
    }
  });
}

getDashboard1(entite) {
  return axios.get(AppelOffre_BASE_REST_API_URL + '/dashboards/annules-infructueux', {
      params: { entite },
    headers: {
      exercice: sessionStorage.getItem("exercice")
    }
  });
}
getdashboard() {
  return axios.get(AppelOffre_BASE_REST_API_URL + '/dashboard', {
    headers: {
      exercice: sessionStorage.getItem("exercice")
    }
  });
}

//
login(user){
    return axios.post(AppelOffre_BASE_REST_API_URL + '/login', user);
}

}

export default new AppelOffreService();