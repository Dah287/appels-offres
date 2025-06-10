import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import EmployeeService from '../services/EmployeeService'

const ListEmployeeComponent = () => {

    const [entiteF, setEntiteF] = useState('')
    const [typeMarcheF, settypeMarcheF] = useState('')

    const [employees, setEmployees] = useState([])

    useEffect(() => {

        getAllEmployees(entiteF,typeMarcheF);
        setEntiteF(entiteF)
        settypeMarcheF(typeMarcheF)

    }, [])

    const getAllEmployees = (entiteF,typeMarcheF) => {
        EmployeeService.getAllEmployees(entiteF,typeMarcheF).then((response) => {
            setEmployees(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    

    const deleteEmployee = (employeeId) => {
       EmployeeService.deleteEmployee(employeeId).then((response) =>{
        getAllEmployees();

       }).catch(error =>{
           console.log(error);
       })
        
    }

    return (
        <div className = "container">
            <h2 className = "text-center"> List Employees </h2>
            <Link to = "/add-appelOffre" className = "btn btn-primary mb-2" > Add Employee </Link>
            {/*  */}
            <div>
        <input
          type="text"
          name="entite"
          placeholder="Filtrer par Entité"
          value = {entiteF}
          onChange = {(e) => setEntiteF(e.target.value)}
        />
        <input
          type="text"
          name="typeMarche"
          placeholder="Filtrer par Type de Marché"
          value = {typeMarcheF}
          onChange = {(e) => settypeMarcheF(e.target.value)}
        />
      </div>
            {/*  */}
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Employee Id </th>
                    <th> Employee First Name </th>
                    <th> Employee Last Name </th>
                    <th> Employee Email Id </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                            <tr key = {employee.id}> 
                                <td> {employee.id} </td>
                                <td> {employee.firstName} </td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-employee/${employee.id}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteEmployee(employee.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent
