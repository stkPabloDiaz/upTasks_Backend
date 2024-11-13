/* IMPORTACIONES  */
import colors from "colors"
import server from './server'               // Importar el Server para comenzar a trabajar


const port = process.env.PORT || 4000       // Definimos el PORT desde la variable de Entorno y sino usamos 4000

server.listen(port, () => {                 // Server escucha el puerto y ejecuta el callback function
    console.log(colors.cyan.bold(`REST API funcionando en el Puerto ${port}`))
    // Para llamar esto se modifica en el package.json - en SCRIPT / DEV
    
})