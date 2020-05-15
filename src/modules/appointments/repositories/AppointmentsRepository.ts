import Appointment from '../entities/Appointment'
import {EntityRepository, Repository} from 'typeorm'

//DTO: Data transfer object

@EntityRepository(Appointment)
class ApointmentsRepository extends Repository<Appointment> {
  //métodod que pega os agendamentos e verifica se a data é igual
  public async findByDate(date: Date): Promise<Appointment | null>{
    const findAppointment = await this.findOne({
      where: {date},
    })

    return findAppointment || null
  }
}

export default ApointmentsRepository
