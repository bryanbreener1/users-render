const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const user = await User.findAll()
    return res.json(user)
});
const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const user = await User.findByPk(id)
    if(!user) return res.status(404).json({ message: 'user not found'})
    return res.json(user)
});
const create = catchError(async(req, res) => {
    const userData = req.body
    const user = await User.create(userData)
    return res.status(201).json(user)
});
const remove = catchError(async(req, res) => {
    const {id} = req.params
    const user = await User.destroy({where:{id}})
    return res.sendStatus(204)
});
const update = catchError(async(req, res) => {
    const {id} = req.params
    const data = req.body
    const user = await User.update(data, {where: {id}, returning:true} )
    if(!user) return res.status(404).json({ message: 'user not found'})
    return res.json(user[1][0])
});

module.exports = {
    getAll,
    getOne,
    create,
    remove,
    update
}