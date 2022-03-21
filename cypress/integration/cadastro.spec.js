import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Cadastro', () => {

    beforeEach(function () {
        cy.fixture('delivery').then((d) => {
            this.delivery = d
        })
    })

    it('Seja um entregador', function () {

        var delivery = signupFactory.delivery()

        signup.go()
        signup.formulario(delivery)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it('CPF incorreto', function () {

        var delivery = signupFactory.delivery()
        delivery.cpf = '09879698AA'

        signup.go()
        signup.formulario(delivery)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')

    })

    it('Email incorreto', function () {

        signup.go()
        signup.formulario(this.delivery.email_invalido)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')

    })

    context('Campos obrigatorios', function () {
        const messages = [
            { field: 'nome', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'cep', output: 'É necessário informar o CEP' },
            { field: 'numero', output: 'É necessário informar o número do endereço' },
            { field: 'metodo_enrega', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' },
        ]

        before(function(){
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signup.alertMessageShouldBe(msg.output)
            })
        })
    })
})