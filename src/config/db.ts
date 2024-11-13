import mongoose from "mongoose";
import colors from "colors"

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta.bold(`MongoDB conectado en: ${url}`));
        
    } catch (error) {
        //        console.log(error.message)      // Da detalles del Error
        console.log(colors.bgRed.bold.white('Error al conectar a MongoDB'))
        
        process.exit(1)                 // Termina la Ejecucion pero el 1 dice que hubo algun Error
    }
}
