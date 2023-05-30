
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadArchive = async (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const nameCut = file.name.split('.')
        const ext = nameCut[nameCut.length - 1].toLowerCase();

        if (!validExtensions.includes(ext)) {
            reject(`La extension ${ext} es invalida, solo se permiten: ${validExtensions}`)
        }
        const tempName = uuidv4() + "." + ext;
        try {
            const uploadPath = path.join(__dirname, '../uploads/', folder, tempName)
            // Use the mv() method to place the file somewhere on your server
            file.mv(uploadPath, function (err) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                resolve(tempName)
            })
        } catch (error) {
            console.log("Error en la direccion: ", error)
        }
    })
}
const extractNameArchive = async (files)=>{
    const { file } = files;
    const name= file.name
    return name
}

module.exports = {
    uploadArchive,
    extractNameArchive
}