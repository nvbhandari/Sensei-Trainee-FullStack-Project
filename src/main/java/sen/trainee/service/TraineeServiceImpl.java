package sen.trainee.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import sen.trainee.dto.TraineeDto;
import sen.trainee.entity.Trainee;
import sen.trainee.exception.TraineeException;
import sen.trainee.repository.TraineeRepository;

@Service
@RequiredArgsConstructor
public class TraineeServiceImpl implements TraineeService {
	private final TraineeRepository traineeRepository;

	@Override
	public String saveTrainee(TraineeDto traineeDto) {
		Optional<Trainee> trnee = traineeRepository.findByName(traineeDto.getName());
		if (!trnee.isPresent()) {
			Trainee trainee = dtoToEntity(traineeDto);
			traineeRepository.save(trainee);
			return null;
		}
		throw new TraineeException("Already exists!");
	}

	@Override
	public TraineeDto getTrainee(int id) {
		Optional<Trainee> trnee = traineeRepository.findById(id);
		if (trnee.isPresent()) {
			Trainee trainee = trnee.get();
			TraineeDto traineeDto = TraineeDto.builder().id(trainee.getId()).name(trainee.getName())
					.city(trainee.getCity()).contactNo(trainee.getContactNo()).dateOfBirth(trainee.getDateOfBirth())
					.emailId(trainee.getEmailId()).aboutUs(trainee.getAboutUs()).password(trainee.getPassword())
					.build();
			return traineeDto;
		}
		throw new TraineeException("No Trainee found!");
	}
	
	@Override
	public Trainee updateTrainee(int id, TraineeDto traineeDto) {
	    Optional<Trainee> findById = traineeRepository.findById(id);
	    if (findById.isPresent()) {
	        Trainee trainee = findById.get();
	        trainee.setName(traineeDto.getName());
	        trainee.setEmailId(traineeDto.getEmailId());
	        trainee.setCity(traineeDto.getCity());
	        trainee.setDateOfBirth(traineeDto.getDateOfBirth());
	        trainee.setAboutUs(traineeDto.getAboutUs());
	        trainee.setPassword(trainee.getPassword());
	        return traineeRepository.save(trainee);
	    }

	    throw new TraineeException("No Trainee found!");
	}

//	@Override
//	public String updateTrainee(int id, TraineeDto traineeDto) {
//		Optional<Trainee> findById = traineeRepository.findById(id);
//		if (findById.isPresent()) {
//			Trainee trainee = findById.get();
//			trainee.setName(traineeDto.getName());
//			trainee.setEmailId(traineeDto.getEmailId());
//			trainee.setCity(traineeDto.getCity());
//			trainee.setDateOfBirth(traineeDto.getDateOfBirth());
//			trainee.setAboutUs(traineeDto.getAboutUs());
//			trainee.setPassword(trainee.getPassword());
//			traineeRepository.save(trainee);
//			return "Details are updated!";
//		}
//
//		throw new TraineeException("No Trainee found!");
//	}

	@Override
	public String deleteTrainee(int id) {
		Optional<Trainee> findById = traineeRepository.findById(id);
		if (findById.isPresent()) {
			Trainee trainee = findById.get();
			traineeRepository.delete(trainee);

			return null;
		}
		throw new TraineeException("No Trainee found!");
	}

	@Override
	public List<TraineeDto> getAllTrainee() {
		List<Trainee> trainees = traineeRepository.findAll();
		List<TraineeDto> traineeDtos = trainees.stream().map(trainee -> entityToDto(trainee))
				.collect(Collectors.toList());
		return traineeDtos;
	}

	public static Trainee dtoToEntity(TraineeDto traineeDto) {
		Trainee trainee = Trainee.builder().name(traineeDto.getName()).city(traineeDto.getCity())
				.contactNo(traineeDto.getContactNo()).dateOfBirth(traineeDto.getDateOfBirth())
				.emailId(traineeDto.getEmailId()).aboutUs(traineeDto.getAboutUs()).password(traineeDto.getPassword())
				.build();
		return trainee;
	}

	public static TraineeDto entityToDto(Trainee trainee) {
		TraineeDto traineeDto = TraineeDto.builder().id(trainee.getId()).name(trainee.getName()).city(trainee.getCity())
				.contactNo(trainee.getContactNo()).dateOfBirth(trainee.getDateOfBirth()).emailId(trainee.getEmailId())
				.aboutUs(trainee.getAboutUs()).password(trainee.getPassword()).build();
		return traineeDto;
	}

	@Override
	public TraineeDto checkLogin(TraineeDto traineeDto) {
		Optional<Trainee> trnee = traineeRepository.findByEmailIdAndPassword(traineeDto.getEmailId(),
				traineeDto.getPassword());
		if (trnee.isPresent()) {
			Trainee trainee = trnee.get();
			TraineeDto traineeDto1 = TraineeDto.builder().id(trainee.getId()).name(trainee.getName())
					.city(trainee.getCity()).contactNo(trainee.getContactNo()).dateOfBirth(trainee.getDateOfBirth())
					.emailId(trainee.getEmailId()).aboutUs(trainee.getAboutUs()).password(trainee.getPassword())
					.build();
			return traineeDto1;
		}
		throw new TraineeException("Do Not exists!");

	}
}
