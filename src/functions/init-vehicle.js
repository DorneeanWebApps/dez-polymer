import { picUrl } from '../config.js';

export const generateVehDescription = (vehicle) => {
    let vehicledefinition = `${vehicle.marca} ${vehicle.model}`;
    let vehicletype = '';

    if (vehicle.tip) {
        vehicledefinition = `${vehicledefinition} ${vehicle.tip}`;
    }
    if (vehicle.fabricatie) {
        vehicledefinition = `${vehicledefinition} fabricat in anul ${vehicle.fabricatie}`;
    }
    if (vehicle.km) {
        vehicledefinition = `${vehicledefinition}, rulaj ${vehicle.km} km`;
    }

    vehicle.categorie === 'Autocare' ? vehicletype = 'autocar ' :
        vehicle.categorie === 'Camioane' ? vehicletype = 'camion ' :
        vehicle.categorie === 'Autoutilitare' ? vehicletype = 'autoutilitara ' :
        vehicle.categorie === 'Microbuze' ? vehicletype = 'microbuz ' :
        vehicle.categorie === 'Autoturisme' ? vehicletype = 'autoturism ' : vehicletype = '';


    let descriere = `Dezmembram ${vehicletype} ${vehicledefinition}.
    Mentionam ca toate piesele listate pentru acest autovehicul au fost verificate in prealabil de specialistii nostri.
    In cazul in care piesa cautata nu apare in lista nu ezitati sa ne contactati pentru verificarea disponibilitatii acesteia.`;

    return descriere;
}


export const organizeVehicle = (vehicle) => {
    vehicle.pictures.map((picture) => {
        picture.fullpath = `${picUrl}${picture.path}/${picture.filename}`;
        if (picture.mainpicture) {
            picture.selected = true;
            vehicle.mainpicturefullpath = `${picUrl}${picture.path}/${picture.filename}`;
            vehicle.hasmainpicture = true;
            vehicle.fullpathloaded = true;
        }
    });

    if (!vehicle.descriere) {
        vehicle.descriere = generateVehDescription(vehicle);
    }

    return vehicle;
}