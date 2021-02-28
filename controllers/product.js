'use strict'
const Product = require('../models/product')

function getProduct(req, res) {
  let id = req.params.id

  Product.findById(id, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al buscar el producto seleccionado: ${err}` })
    if (!product) return res.status(404).send({ message: `El producto no existe` })

    res.status(200).send({ product })
  })

}

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error al buscar productos: ${err}` })
    if (!products) return res.status(404).send({ message: `No existen` })

    res.send(200, { products })
  })
}

function saveProduct(req, res) {
  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Error al guardar el producto en la base de datos ${err}` })
    res.status(200).send({ product: productStored })
  })
}

function updateProduct(req, res) {
  let id = req.params.id
  let update = req.body

  Product.findByIdAndUpdate(id, update, { new: true }, (err, productUpdate) => {
    if (err) res.status(500).send({ message: `Error al actualizar el producto ${err}` })

    res.status(200).send({ product: productUpdate })

  })
}

function deleteProduct(req, res) {
  let id = req.params.id

  Product.findById(id, (err, product) => {
    if (err) res.status(500).send({ message: `Error al borrar el producto ${err}` })

    product.remove(err => {
      if (err) res.status(500).send({ message: `Error al borrar el producto ${err}` })
      res.status(200).send({ message: `Producto borrado correctamente` })
    })

  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
}