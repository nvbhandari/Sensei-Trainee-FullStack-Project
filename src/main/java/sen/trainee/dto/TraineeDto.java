package sen.trainee.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder

public class TraineeDto {
	private int id;
	private String name;
	private String emailId;
	private long contactNo;
	private LocalDate dateOfBirth;
	private String city;
	private String password;
	private String aboutUs;
	
}
