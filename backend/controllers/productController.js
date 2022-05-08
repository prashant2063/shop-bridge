const productModel = require('../models/productModel');
const mongoose = require('mongoose');

exports.getProducts = async (req, res) => {
    try {
        const pagination = JSON.parse(req.query.pagination)
        let data = {}
        const content = await productModel.aggregate([
            {
                '$skip': (pagination.page - 1) * pagination.pageSize
            }, {
                '$limit': pagination.pageSize
            }
        ]);
        const collectionSize = await productModel.aggregate([
            {
                '$count': 'collectionSize'
            }
        ])
        data = {
            content,
            collectionSize: collectionSize[0].collectionSize
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const _id = req.query._id;
        const data = await productModel.deleteOne({ _id: mongoose.Types.ObjectId(_id) })
        res.send(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addProduct = async (req, res) => {
    try {
        let product = req.body;
        product.update_time = Math.round((new Date()).getTime());
        const data = await productModel.create(product)
        res.status(200).json({ message: data });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let product = req.body;
        product.update_time = Math.round((new Date()).getTime())
        const _id = product._id
        delete product._id
        const data = await productModel.updateOne({_id}, product)
        res.status(200).json({ message: data });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}