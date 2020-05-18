import Appointment from '../entities/Appointment'
import {EntityRepository, Repository} from 'typeorm'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
//DTO: Data transfer object

@EntityRepository(Appointment)
class ApointmentsRepository extends Repository<Appointment> implements IAppointmentsRepository {
  //método que pega os agendamentos e verifica se a data é igual
  public async findByDate(date: Date): Promise<Appointment | undefined>{
    const findAppointment = await this.findOne({
      where: {date},
    })

    return findAppointment;
  }
}

export default ApointmentsRepository
