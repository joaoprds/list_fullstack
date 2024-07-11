const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newProduct = await Product.create({ name, description, price });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto." });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      product.name = name;
      product.description = description;
      product.price = price;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ error: "Produto não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.json({ message: "Produto deletado com sucesso." });
    } else {
      res.status(404).json({ error: "Produto não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
};

exports.loadTestProducts = async (req, res) => {
  try {
    const testProducts = Array.from({ length: 50 }, (_, i) => ({
      name: `Produto ${i + 1}`,
      description: `Descrição do produto ${i + 1}`,
      price: (Math.random() * 100).toFixed(2),
    }));
    await Product.bulkCreate(testProducts);
    res
      .status(201)
      .json({ message: "50 produtos de teste carregados com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao carregar produtos de teste." });
  }
};

exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.destroy({ where: {}, truncate: true });
    res.json({ message: "Todos os produtos foram deletados com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar todos os produtos." });
  }
};
