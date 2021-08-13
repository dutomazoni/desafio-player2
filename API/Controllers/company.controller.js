import axios from "axios";
import {Company} from "../Models";

let company_routes = {};

company_routes.get_company = async (req,res) => {
    try {
        let company = await Company.findOne({cnpj: req.params.cnpj});
        if (company) {
            return res.status(200).json({company})
        }else {
            return res.status(400).json({message: "Company not found."})
        }
    } catch (error) {
        return res.status(400).json({error});
    }
}
company_routes.register_company = async (req,res) => {
    try {
        let response = await axios.get('https://brasilapi.com.br/api/cnpj/v1/'+ req.params.cnpj, {
            headers: { Authorization: req.headers.authorization },
            mode: 'cors'
        })
        let company;
        if (response.status === 200) {
            company = response.data
            await Company.create(company)
            return res.status(200).json({message: "Company registered successfully!"})
        }else {
            return res.status(400).json({message: "Company not found."})
        }

    } catch (error) {
        return res.status(400).json({error});
    }
}
company_routes.remove_company = async (req,res) => {
    try {
        let company = await Company.findOneAndRemove({cnpj: req.params.cnpj});
        if(company){
            return res.status(200).json({message: "Company deleted successfully!"})
        }else {
            return res.status(400).json({message: "Company not found."})
        }

    } catch (error) {
        return res.status(400).json({error});
    }
}
company_routes.edit_company = async (req,res) => {
    try {
        let company = await Company.findOne({cnpj: req.params.cnpj});
        let {nome_fantasia} = req.body
        if(company){
            company.nome_fantasia = nome_fantasia
            let new_company = await Company.findByIdAndUpdate(company._id, company, { new: true})
            return res.status(200).json({message: "Company updated successfully!", company: new_company})
        }else {
            return res.status(400).json({message: "Company not found."})
        }

    } catch (error) {
        return res.status(400).json({error});
    }
}


export { company_routes };
