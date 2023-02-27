import Axios, { AxiosInstance } from "axios";
import { singleton } from "tsyringe";


@singleton()
export default class ApiService {

    instance: AxiosInstance = Axios.create({
        baseURL: "https://jsonplaceholder.typicode.com"
    });

    constructor() {
        this.instance.interceptors.request.use((config) => {
            return config;
        }, (error => {
            return Promise.reject(error);
        }));

        this.instance.interceptors.response.use((v) => v, (error) => {
            if (error?.response?.data?.userMsg)
                error.message = error.response.data.userMsg;
            return Promise.reject(error);
        })
    }

    async fetchTodos(): Promise<any> {
        var response = await this.instance.request({
            method: 'GET',
            url: '/todos',
        });

        return response.data;

    }
}
