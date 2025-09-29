import React, {useEffect, useState} from "react";

function API() {

    const [data, setData] = useState([]);

    useEffect(() => {

        function loadData(){
            let url = 'https://sujeitoprogramador.com/rn-api/?api=posts';
            fetch(url)
            .then(r => r.json())
            .then(json => {
                console.log(json);
                setData(json);
            })
        }
        loadData();
        }, []);
    return(
        <div className="container">
            <header>
                <strong>React Nutri</strong>
            </header>
            <div className="containerPosts">
            {data.map(item => {
                return(
                    <article key={item.id} className="post">
                        <strong className="titulo">{item.titulo}</strong>
                        <img className="capa" src={item.capa}/>
                    </article>
                )
            })}
            </div>
        </div>
    );
}

export default API;