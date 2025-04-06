import { validate } from 'class-validator';
import { CreatePokemonDto } from './create-pokemon.dto';

describe('CreatePokemonDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreatePokemonDto();
    dto.name = 'Pikachu';
    dto.type = 'Electric';

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should be valid if name is not present', async () => {
    const dto = new CreatePokemonDto();
    // dto.name = 'Pikachu';
    dto.type = 'Electric';

    const errors = await validate(dto);
    const nameError = errors.find((error) => error.property === 'name');
    expect(nameError).toBeDefined();
  });

  it('should be valid if type is not present', async () => {
    const dto = new CreatePokemonDto();
    dto.name = 'Pikachu';
    // dto.type = 'Electric';

    const errors = await validate(dto);
    const typeError = errors.find((error) => error.property === 'type');
    expect(typeError).toBeDefined();
  });

  it('should hp must be positive number', async () => {
    const dto = new CreatePokemonDto();
    dto.name = 'Pikachu';
    dto.type = 'Electric';
    dto.hp = -10;

    const errors = await validate(dto);
    const hpError = errors.find((error) => error.property === 'hp');
    const constraints = hpError?.constraints;

    expect(hpError).toBeDefined();
    expect(constraints).toEqual({ min: 'hp must not be less than 0' });
  });

  it('should be invalid with non-string sprites', async () => {
    const dto = new CreatePokemonDto();
    dto.name = 'Pikachu';
    dto.type = 'Electric';
    dto.hp = -10;
    dto.sprites = [123, 456] as unknown as string[];

    const errors = await validate(dto);
    const spritesError = errors.find((error) => error.property === 'sprites');
    expect(spritesError).toBeDefined();
  });

  it('should be valid with string sprites', async () => {
    const dto = new CreatePokemonDto();
    dto.name = 'Pikachu';
    dto.type = 'Electric';
    dto.hp = -10;
    dto.sprites = ['sprite1.png', 'sprite2.png'];

    const errors = await validate(dto);
    const spritesError = errors.find((error) => error.property === 'sprites');
    // expect(spritesError).not.toBeDefined()
    expect(spritesError).toBe(undefined);
    expect(spritesError).toBeUndefined();
  });
});
