import { validate } from 'class-validator';
import { UpdatePokemonDto } from './update-pokemon.dto';

describe('UpdatePokemonDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new UpdatePokemonDto();
    dto.name = 'Pikachu';
    dto.type = 'Electric';

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should hp must be positive number', async () => {
    const dto = new UpdatePokemonDto();
    dto.name = 'Pikachu';
    dto.type = 'Electric';
    dto.hp = -10;

    const errors = await validate(dto);
    const hpError = errors.find((error) => error.property === 'hp');
    const constraints = hpError?.constraints;

    expect(hpError).toBeDefined();
    expect(constraints).toEqual({ min: 'hp must not be less than 0' });
  });
});
