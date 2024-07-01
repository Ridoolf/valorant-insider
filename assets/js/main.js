contenedor_agentes = document.getElementById('contenedor_agentes');
btn_lista = document.querySelectorAll('.btn_lista');

const URL = `https://valorant-api.com/v1/agents?language=es-MX`;

fetch(URL)
    .then(res => res.json())
    .then(data => mostrarAgentes(data))

function mostrarAgentes(data){
    data.data.forEach(agente => {
        if(agente.displayName != 'Sova'){
            const tarjeta = document.createElement('div');
            tarjeta.classList = 'tarjeta_agente' 
            tarjeta.id = `${agente.displayName}`
            tarjeta.innerHTML = `
            <img
                class="icono_agente"
                src="${agente.displayIcon}"
                alt="icono de ${agente.displayName}"
            />
            <div class="descripcion_agente">
                <div class="info_principal">
                    <h3>${agente.displayName}</h3>
                    <div class="contenedor_rol">
                        <p class="rol">${agente.role.displayName}</p>
                        <img
                            class="rol_agente"
                            src="${agente.role.displayIcon}"
                            alt="rol de ${agente.displayName}"
                        />
                    </div>
                </div>
                <div class="habilidades_agente">
                    <img
                        src="${agente.abilities[0].displayIcon}"
                        alt=""
                    />
                    <img
                        src="${agente.abilities[1].displayIcon}"
                        alt=""
                    />
                    <img
                        src="${agente.abilities[2].displayIcon}"
                        alt=""
                    />
                    <img
                        src="${agente.abilities[3].displayIcon}"
                        alt=""
                    />
                </div>
            </div>
            `
            contenedor_agentes.append(tarjeta);
        }
    })    
}

btn_lista.forEach( boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.currentTarget.id;

        document.querySelector('.filtro_actual').classList.remove('filtro_actual');
        e.currentTarget.classList.add('filtro_actual');

        contenedor_agentes.innerHTML = '';
        if (id === 'todos'){
            fetch(URL)
                .then(res => res.json())
                .then(data => mostrarAgentes(data));
        } else {
            fetch(URL)
                .then(res => res.json())
                .then(data => {
                    const agentesFiltrados = data.data.filter(agente => agente.role ? agente.role.displayName.toLowerCase() === id : 'iniciador');
                    mostrarAgentes({ data: agentesFiltrados });
                })
        }
    })
})