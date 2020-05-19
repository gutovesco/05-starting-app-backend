import {Router} from 'express'
import {parseISO} from 'date-fns'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import {container} from 'tsyringe'

const appointmentsRouter = Router()

//aplica o middleware(token jwt) em todas as rotas, caso queira adicionar em uma rota especifica basta
//colocar o ensureAuthenticated antes do async e do request response
appointmentsRouter.use(ensureAuthenticated)

  //appointmentsRouter.get('/', async (request, response) => {
    //chama o método que lista todos os agendamentos
    //const appointments = await appointmentsRepository.find()

//return response.json(appointments)
 // })

appointmentsRouter.post('/', async (request, response) => {

  const {provider_id, date} = request.body

  //a data é convertido para o formato ISO
  const parsedDate = parseISO(date)

  const createAppointment = container.resolve(CreateAppointmentService)

  const appointment = await createAppointment.execute({provider_id, date: parsedDate})

  return response.json(appointment)

})

export default appointmentsRouter
