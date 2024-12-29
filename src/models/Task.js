
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        description: {
            type: String
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Esto creará automáticamente createdAt y updatedAt
    }
);

module.exports = mongoose.model('Task', taskSchema);
