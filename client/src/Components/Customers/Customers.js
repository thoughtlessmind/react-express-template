import React , {useState, useEffect} from 'react';
// import { Box, makeStyles, createStyles } from '@material-ui/core';

const Customers  = () => {
    const[customers, setCustomers] = useState([])
    const[testData, setTestData] = useState([])


    useEffect(()=>{
        fetch('/api')
            .then(res => res.json())
            .then(data => setCustomers(data))
    },[])

    useEffect(()=>{
        console.log("Customers list", customers)
    },[customers])

    useEffect(()=>{
        fetch("/testApi")
            .then(res => res.json())
            .then(data => setTestData(data))
    },[])

    useEffect(()=>{
        console.log("nasa details", testData)
    },[testData])


    return(
        <div>
            <h2>Hi, its from customers.js</h2>
            <ul>
                { customers.length>0 ? 
                    customers.map(customer =>
                        <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
                    ) :
                    <li>No data</li>
                }
            </ul>
            <h2>
                test image
            </h2>
            {/* <img src= {testData.url} alt="nasa image of the day"/> */}

            { testData.length === 0 || testData === undefined ?
                <h3>image is being loaded</h3> :
                <div>
                    <img src= {testData.url} height="300px" alt="nasa image of the day"/> 
                    <h5>{testData.explanation}</h5>
                </div>
            }
        </div>
    );
}

// const usestyles = makeStyles(theme =>
//     createStyles({

//     })
// )

export default Customers ;