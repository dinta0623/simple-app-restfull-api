import dayjs from "dayjs"

export default {
    error(title: string, msg: string){
        console.log(`${dayjs(Date.now()).format("dddd, MMMM D, YYYY h:mm A")} [ERROR] [${title}] ${msg}`)
    },
    info(title: string, msg: string){
        console.log(`${dayjs(Date.now()).format("dddd, MMMM D, YYYY h:mm A")} [INFO] [${title}] ${msg}`)
    }
}