import Appointment from '../models/Appointment'
import {startOfHour} from 'date-fns'
import {getCustomRepository} from 'typeorm'
import AppointmentsRepository from '../Appointments/AppointmentsRepository'
import ApointmentsRepository from '../Appointments/AppointmentsRepository'

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  //método que executa as regras de negócio
  public async execute({provider_id, date}: Request): Promise<Appointment>{

    const appointmentsRepository = getCustomRepository(ApointmentsRepository)

    //seta a hora
    const appointmentDate = startOfHour(date)

  //armazena o resultado da busca por método na variavel
  const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

  //se a data do novo agendamento já existe, retorna um erro falando que já tem um agendamento
  if(findAppointmentInSameDate){
    throw Error('Appointment already booked')
  }

  //método que cria um novo agendamento
  const appointment = appointmentsRepository.create({
    provider_id,
    date: appointmentDate
  })

  await appointmentsRepository.save(appointment)

  return appointment
  }
}

export default CreateAppointmentService
