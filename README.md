## Guía de Testing para DTOs

### Validación de campos obligatorios

Se verifica que los campos obligatorios estén presentes y cumplan con las validaciones definidas.

```typescript
// filepath: /src/pokemons/dto/create-pokemon.dto.spec.ts
it('should validate if name is not present', async () => {
  const dto = new CreatePokemonDto();
  dto.type = 'Electric';

  const errors = await validate(dto);
  const nameError = errors.find((error) => error.property === 'name');
  expect(nameError).toBeDefined();
});
```

### Validación de valores mínimos

Se asegura que los valores numéricos cumplan con los límites establecidos.

```typescript
// filepath: /src/shared/dtos/pagination.dto.spec.ts
it('should validate with invalid limit', async () => {
  const dto = new PaginationDto();
  dto.limit = -1;

  const errors = await validate(dto);
  errors.forEach((error) => {
    if (error.property === 'limit') {
      expect(error.constraints?.min).toBeDefined();
    }
  });
});
```

### Conversión de tipos

Se prueba que los valores string sean convertidos correctamente a números.

```typescript
// filepath: /src/shared/dtos/pagination.dto.spec.ts
it('should convert strings into numbers', async () => {
  const input = { limit: '10', page: '2' };
  const dto = plainToInstance(PaginationDto, input);

  const errors = await validate(dto);
  expect(errors.length).toBe(0);
  expect(dto.limit).toBe(10);
  expect(dto.page).toBe(2);
});
```

### Validación de arreglos

Se valida que los elementos de un arreglo cumplan con las restricciones definidas.

```typescript
// filepath: /src/pokemons/dto/create-pokemon.dto.spec.ts
it('should be invalid with non-string sprites', async () => {
  const dto = new CreatePokemonDto();
  dto.name = 'Pikachu';
  dto.type = 'Electric';
  dto.sprites = [123, 456] as unknown as string[];

  const errors = await validate(dto);
  const spritesError = errors.find((error) => error.property === 'sprites');
  expect(spritesError).toBeDefined();
});
```

### Uso de PartialType

Se prueba que los DTOs extendidos con `PartialType` hereden correctamente las validaciones.

```typescript
// filepath: /src/pokemons/dto/update-pokemon.dto.spec.ts
it('should validate inherited validations', async () => {
  const dto = new UpdatePokemonDto();
  dto.hp = -10;

  const errors = await validate(dto);
  const hpError = errors.find((error) => error.property === 'hp');
  expect(hpError).toBeDefined();
});
```
