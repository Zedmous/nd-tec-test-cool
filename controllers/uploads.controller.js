const path = require('path')
const fs = require('fs')
const { request, response } = require("express");
const { uploadArchive } = require("../helpers");
const { UserModel, DestinationModel } = require("../models")

const updateImgColection = async (req = request, res = response) => {
    const { collection, id } = req.params;
    let modelo;
    switch (collection) {
        case 'users':
            modelo = await UserModel.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msj: `No existe un usuario con este id: ${id}`
                })
            }

            break;
        case 'destinations':
            modelo = await DestinationModel.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msj: `No existe un destino con este id: ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msj: "Se me olvido validar esto" })
            break;
    }
    if (modelo.img) {
        const pathImg = path.join(__dirname, '../uploads', collection, modelo.img)
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg)
        }
    }
    try {
        const name = await uploadArchive(req.files, undefined, collection)
        modelo.img = name
        modelo.save();
        return res.json({ msj: `Se ha guardado exitosamente` })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msj: error })

    }
}

const updateImagesDestination = async (req = request, res = response) => {
    const { id } = req.params;
    let { description } = req.body
    let destination = await DestinationModel.findById(id)
    if (!destination) {
        return res.status(400).json({
            msj: `No existe un destino con este id: ${id}`
        })
    }
    if (destination.catalogue) {
        let iImg = destination.catalogue.findIndex(function (catalogue) {
            if (catalogue.img == req.files.file.name) {
                return true;
            }
        });
        if (iImg >= 0) {
            const pathImg = path.join(__dirname, '../uploads', "destinations", destination.catalogue[iImg].img)
            if (fs.existsSync(pathImg)) {
                fs.unlinkSync(pathImg)
            }
            destination.catalogue.splice(iImg, 1);

        }

    }
    try {
        const name = await uploadArchive(req.files, undefined, "destinations")
        let data = {
            id: destination.catalogue.length + 1,
            img: name,
            description
        }
        destination.catalogue.push(data)
        destination.save();
        return res.json({ msj: `Se ha guardado exitosamente` })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msj: error })

    }
}
const showImagesDestination = async (req = request, res = response) => {


    const { id } = req.params;
    let destination = await DestinationModel.findById(id)
    if (!destination) {
        return res.status(400).json({
            msj: `No existe un destino con este id: ${id}`
        })
    }
    if (destination.catalogue) {

        let imagenes=[];

        let i=0;
        while(i<destination.catalogue.length){
            const pathImg = path.join(__dirname, '../uploads', "destinations", destination.catalogue[i].img)
            let data;
            if (fs.existsSync(pathImg)) {
                data = fs.readFileSync(pathImg, { encoding: 'utf8' });
            }
            
            // convertir la cadena a base64
            let base64Data = data.toString('base64');;
            imagenes.push({name:destination.catalogue[i].img,data:base64Data})
            i++;
        }
        if(imagenes.length>0){
            return res.json({
                total:imagenes.length,
                imagenes
            })
        }

    }
    const pathImg = path.join(__dirname, '../assets', 'no-image.jpg')
    if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg)
    }


}

const showImg = async (req = request, res = response) => {
    const { id,collection } = req.params;
    let modelo;
    switch (collection) {
        case 'users':
            modelo = await UserModel.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msj: `No existe un usuario con este id: ${id}`
                })
            }
            break;
        case 'destinations':
            modelo = await DestinationModel.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msj: `No existe un destino con este id: ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msj: "Se me olvido validar esto" })
            break;
    }

    if (modelo.img) {

        const pathImg = path.join(__dirname, '../uploads', collection, modelo.img)
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }
    }
    const pathImg = path.join(__dirname, '../assets', 'no-image.jpg')
    if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg)
    }


}

module.exports = {
    showImg,
    updateImgColection,
    showImagesDestination,
    updateImagesDestination
}