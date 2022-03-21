var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {
    delivery: function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            nome: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
             email: faker.internet.email(firstName),
             whatsapp: '31999999999',
             endereco: {
                 cep:'30350040',
                 rua: 'Rua Conselheiro Quintiliano Silva',
                 numero: '1000',
                 complemento: 'ap 202',
                 bairro: 'Santo Antônio',
                 cidade_uf: 'Belo Horizonte/MG'
             },
             metodo_etrega: 'Moto',
             cnh: 'Teste.jpg'
        }

        return data
    }
}