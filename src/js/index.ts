import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IBook {
    isbn13:string,
    titel:string,
    forfatter:string,
    sidetal:number
}

let baseUri: string = "http://localhost:5000/api/bog"

new Vue({
    el: "#app",
    data:{
        Books:[],
        errors:[],
        deleteId: 0,
        deleteMessage: "",
        formData: {isbn13:"", titel:"",forfatter:"", sidetal:0}
    },
    methods:{
        getAllBooks(){
            axios.get<IBook[]>(baseUri)
            .then((Response: AxiosResponse<IBook[]>)=>{
                this.Books = Response.data
            })
            .catch((error:AxiosError) =>{
                console.log(error.message)
            })
        },
        deletebook(deleteId: number){
            let uri: string = baseUri + "/" + deleteId
            axios.delete<void>(uri)
            .then((response: AxiosResponse)=>{
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllBooks()
            })
            .catch((error:AxiosError) =>{
                console.log(error.message)
            })
        },
        addbook(){
            axios.post<IBook>(baseUri, this.formData)
            .then((response: AxiosResponse) =>{
                let message: string = "response" + response.status + " " + response.statusText
                this.getAllBooks()
            })
            .catch((error:AxiosError) =>{
                console.log(error.message)
            })
        }
    }
})