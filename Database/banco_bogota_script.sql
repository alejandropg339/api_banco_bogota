-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema banco_bogota_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema banco_bogota_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `banco_bogota_db` ;
USE `banco_bogota_db` ;

-- -----------------------------------------------------
-- Table `banco_bogota_db`.`ciudad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `banco_bogota_db`.`ciudad` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `banco_bogota_db`.`cuenta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `banco_bogota_db`.`cuenta` (
  `num` INT NOT NULL,
  `cedula` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `saldo` DOUBLE NOT NULL,
  `ciudad_id` INT(6) NOT NULL,
  PRIMARY KEY (`num`),
  INDEX `fk_cuenta_ciudad_idx` (`ciudad_id` ASC),
  CONSTRAINT `fk_cuenta_ciudad`
    FOREIGN KEY (`ciudad_id`)
    REFERENCES `banco_bogota_db`.`ciudad` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `banco_bogota_db`.`tipo_transaccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `banco_bogota_db`.`tipo_transaccion` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `banco_bogota_db`.`transaccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `banco_bogota_db`.`transaccion` (
  `id` INT(8) NOT NULL,
  `valor` DOUBLE NOT NULL,
  `fecha` DATETIME NOT NULL,
  `tipo` INT(6) NOT NULL,
  `cuenta` INT(6) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_transaccion_cuenta1_idx` (`cuenta` ASC),
  INDEX `fk_transaccion_tipo_transaccion1_idx` (`tipo` ASC),
  CONSTRAINT `fk_transaccion_cuenta1`
    FOREIGN KEY (`cuenta`)
    REFERENCES `banco_bogota_db`.`cuenta` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaccion_tipo_transaccion1`
    FOREIGN KEY (`tipo`)
    REFERENCES `banco_bogota_db`.`tipo_transaccion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;