import Appointment from '../infra/typeorm/entities/Appointment'
import {startOfHour} from 'date-fns'
import {injectable ,inject} from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'


interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ){}
  //método que executa as regras de negócio
  public async execute({provider_id, date}: IRequest): Promise<Appointment>{

    //seta a hora
    const appointmentDate = startOfHour(date)

  //armazena o resultado da busca por método na variavel
  const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)

  //se a data do novo agendamento já existe, retorna um erro falando que já tem um agendamento
  if(findAppointmentInSameDate){
    throw new AppError('Appointment already booked')
  }

  //método que cria um novo agendamento
  const appointment = await this.appointmentsRepository.create({
    provider_id,
    date: appointmentDate
  })

  return appointment
  }
}

export default CreateAppointmentService
