package sen.trainee.exception.handler;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import sen.trainee.exception.TraineeException;

@RestControllerAdvice
public class ExceptionHandlers {
	@ExceptionHandler(value = {TraineeException.class})
	public String exceptionHandler(RuntimeException run) {
		return run.getMessage();
	}
}
