export enum CleaningMethodEnum {
    Virgin = 1,
    SilicaApplication = 2,
    BlueSilicaApplication = 3,
    Sanol = 4,
    Talc = 5,
    AiryInTheShade = 6,
    Sunbathing = 7,
    BodoutSilicaApplication = 8,
    SecaPaxSilicaApplication = 9,
}

export const getTypeList = (): {id: CleaningMethodEnum, name: string}[] => {
    return Object.entries(CleaningMethodEnum)
        .map((key) => {
        if (Number(key[0])) {
            const id = Number(key[0]);
            const name = getTypeDescription(id);
            return { id: id, name: name };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).filter(x => x != null) as any[];
}

export const getTypeDescription = (value: CleaningMethodEnum): string => {
    const data = {
        1: 'Virgem',
        2: 'Aplicação de Sílica',
        3: 'Aplicação de Sílica Azul',
        4: 'Sanol',
        5: 'Talco',
        6: 'Arejado na Sombra',
        7: 'Banho de Sol',
        8: 'Sílica Gel Regenerável Bodout (40g)',
        9: 'Sílica Gel Seca Pax (1g)',
    };

    return data[value];
}

// export const getTypeEnum = (value: string): CleaningMethodEnum => {
//     const data = {
//       "Virgem": CleaningMethodEnum.Virgin,
//       "Aplicação de Sílica": CleaningMethodEnum.SilicaApplication,
//       "Aplicação de Sílica Azul": CleaningMethodEnum.BlueSilicaApplication,
//       "Sanol": CleaningMethodEnum.Sanol,
//       "Talco": CleaningMethodEnum.Talc,
//       "Arejado na Sombra": CleaningMethodEnum.AiryInTheShade,
//       "Banho de Sol": CleaningMethodEnum.Sunbathing,
//     };  
  
//     return data[value];
// }