package sen.trainee.service;

import java.util.List;

import sen.trainee.dto.TraineeDto;
import sen.trainee.entity.Trainee;

public interface TraineeService {

	String saveTrainee(TraineeDto traineeDto);

	TraineeDto getTrainee(int id);

	Trainee updateTrainee(int id,TraineeDto traineeDto);

	String deleteTrainee(int id);

	List<TraineeDto> getAllTrainee();

	TraineeDto checkLogin(TraineeDto traineeDto);

}
