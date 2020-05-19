import Appointment from '../entities/Appointment'
import {getRepository, Repository} from 'typeorm'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
//DTO: Data transfer object

class ApointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>
  constructor(){
    this.ormRepository = getRepository(Appointment)
  }
  //método que pega os agendamentos e verifica se a data é igual
  public async findByDate(date: Date): Promise<Appointment | undefined>{
    const findAppointment = await this.ormRepository.findOne({
      where: {date},
    })

    return findAppointment;
  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = this.ormRepository.create({provider_id, date});

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default ApointmentsRepository
