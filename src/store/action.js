import axios from 'axios'

const ajax = axios.create({
  baseURL:'',
  // withCredentials: true, 
})

export default{
	login({commit,state},data){
		return ajax.get('http://127.0.0.1:8360',{
			params : data
		})
	}
}