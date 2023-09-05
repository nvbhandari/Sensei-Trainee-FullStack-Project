package sen.trainee.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sen.trainee.entity.Trainee;

public interface TraineeRepository extends JpaRepository<Trainee, Integer> {

	Optional<Trainee> findByName(String name);

	Optional<Trainee> findByEmailIdAndPassword(String emailId, String password);

}
