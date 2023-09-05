 package sen.trainee.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import sen.trainee.dto.TraineeDto;
import sen.trainee.entity.Trainee;
import sen.trainee.service.TraineeService;

@RequestMapping("/trainee")
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class TraineeController {
	private final TraineeService traineeService;

	@PostMapping("/save")
	public ResponseEntity<String> saveTrainee(@RequestBody TraineeDto traineeDto) {
		String message = traineeService.saveTrainee(traineeDto);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}
	
	@PostMapping("/login")
       public ResponseEntity<TraineeDto> checkLogin(@RequestBody TraineeDto traineeDto){
		TraineeDto traineeDto1 = traineeService.checkLogin(traineeDto);
		return ResponseEntity.status(HttpStatus.OK).body(traineeDto1);
	}  
       
	@GetMapping("/get")
	public ResponseEntity<TraineeDto> getTrainee(@PathParam("id") int id) {
		TraineeDto traineeDto = traineeService.getTrainee(id);
		return ResponseEntity.status(HttpStatus.OK).body(traineeDto);
	}
	@PutMapping("/update")
	public ResponseEntity<Trainee> update(@PathParam(value = "id") int id, @RequestBody TraineeDto traineeDto) {
	    Trainee updatedTrainee = traineeService.updateTrainee(id, traineeDto);
	    return ResponseEntity.ok(updatedTrainee);
	}

//	@PutMapping("/update")
//	public ResponseEntity<String> update(@PathParam("id") int id, @RequestBody TraineeDto traineeDto) {
//		String message = traineeService.updateTrainee(id, traineeDto);
//		return ResponseEntity.status(HttpStatus.OK).body(message);
//	}

	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteTrainee(@PathParam("id") int id) {
		String message = traineeService.deleteTrainee(id);
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}

	@GetMapping("/getall")
	public ResponseEntity<List<TraineeDto>> getAllTrainee() {
		List<TraineeDto> traineeDtos = traineeService.getAllTrainee();
		return ResponseEntity.ok(traineeDtos);
	}

}
