const { assert } = require("chai")

const TodoList = artifacts.require('TodoList')

contract (TodoList, (accounts) => {
  before(async ()=> {
    this.todoList = await TodoList.deployed()
  })
  it('Deploys successfully...', async () => {
    const address = await this.todoList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })
  it('lists tasks', async () => {
    const taskCount = await this.todoList.taskCount()
    const task = await this.todoList.tasks(taskCount)
    assert.equal(task.id.toNumber(), taskCount.toNumber())
    assert.equal(task.content, 'Checkout blockchain documentation')
    assert.equal(task.completed, false)
    assert.equal(taskCount.toNumber(), 1)
  })

  it('create tasks', async () => {
    const result = await this.todoList.createTask('eth-todo-list')
    const taskCount = await this.todoList.taskCount()
    assert.equal(taskCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, 'eth-todo-list')
    assert.equal(event.completed, false)
  })

  
})