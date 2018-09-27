
module.exports = {

    attributes: {

        code: {
            type: 'string',
            required: true,
            unique: true
        },

        name: {
            type: 'string',
            required: true
        },

        description: {
            type: 'string'
        },
        
        category: {
            type: 'string'
        },

        service: {
            type: 'string'
        },

        faIcon: {
            type: 'string'
        },

        iconColor: {
            type: 'string'
        },

        user: {
            model: 'User',
            defaultsTo: 0, // By default user 0 is Gladys
        },


    }
};
