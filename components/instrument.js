import React, { useState, useEffect } from "react";

const divStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD",
  borderRadius: 5
};
const PortfolioChart = props => {
  const [instruments, setInstruments] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const getMoreDetails = "Show more details";
  const hideMoreDetails = "Hide extra details";
  //   useEffect(() => {
  //     console.log("instruments ran with id " + props.id);
  //     const token = localStorage.getItem("token");

  //     //får ej pathen fungerar ej?

  //     fetch("https://beta.stockzoom.com/api/v1/instruments/" + props.id + "/", {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "application/json; charset=utf-8"
  //       }
  //     }).then(response => {
  //       if (response.ok) {
  //         response.json().then(ins => {
  //           setInstruments([ins]);
  //           console.log(ins);
  //         });
  //       } else {
  //         console.log("error retrieving data");
  //       }
  //     });
  //   }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://beta.stockzoom.com/api/v1/me/portfolios/" + props.id + "/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(ins => {
          const inst = ins.positions;
          inst.forEach(element => {
            return element;
          });
          setInstruments(inst);
        });
      } else {
        console.log("error retrieving data");
      }
    });
  }, []);
  const GetMoreInfo = () => {
    !showChart ? setShowChart(true) : setShowChart(false);
  };
  return (
    <article>
      <div>
        <h3>Stocks:</h3>
        <a onClick={GetMoreInfo}>
          {!showChart ? `${getMoreDetails}` : `${hideMoreDetails}`}
        </a>
        <ul>
          {instruments
            ? instruments.map(i => (
                <li key={i.instrument.id}>
                  <div style={divStyle}>
                    <h4>
                      {i.instrument.name}
                      <br />
                      ID: {i.instrument.id}
                    </h4>
                    {showChart ? (
                      <div>
                        <table width="100%" border="1">
                          <tbody>
                            <tr>
                              <th>Price open</th>
                              <th>Price today</th>
                              <th>Price close</th>
                            </tr>
                            <tr>
                              <td>
                                {!i.instrument.price_open
                                  ? "Null"
                                  : i.instrument.price_open}
                              </td>
                              <td>
                                {!i.instrument.price_today
                                  ? "Null"
                                  : i.instrument.price_today}
                              </td>
                              <td>
                                {!i.instrument.price_close
                                  ? "Null"
                                  : i.instrument.price_close}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p>Acquisition price: {i.acquisition_price}</p>
                      </div>
                    ) : null}
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
      <style jsx>{`
        article {
          margin-top: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
        }
        div {
          margin: 20px;
        }
        h4 {
          margin: 0;
          padding: 0;
        }
        a {
          cursor: pointer;
          color: blue;
        }
        a:hover {
          opacity: 0.6;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          width: 50%;
          list-style: none;
        }
      `}</style>
    </article>
  );
};

export default PortfolioChart;
