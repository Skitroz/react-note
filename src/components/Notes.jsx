import React, { useState, useEffect } from 'react';
import { IoIosRemoveCircle, IoIosAddCircle, IoIosCreate } from "react-icons/io";

const Notes = () => {
    const [eleves, setEleves] = useState([]);

    useEffect(() => {
        const elevesLocalStorage = localStorage.getItem('eleves');
        if (elevesLocalStorage) {
            setEleves(JSON.parse(elevesLocalStorage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('eleves', JSON.stringify(eleves));
    }, [eleves]);

    const ajouterEleve = () => {
        const nouveauNomEleve = prompt("Saisissez le nom de l'élève :");
        if (nouveauNomEleve) {
            const nouvelEleve = {
                nom: nouveauNomEleve,
                matieres: [
                    { nom: 'Sport', notes: [] },
                    { nom: 'Maths', notes: [] },
                    { nom: 'Physique-Chimie', notes: [] },
                    { nom: 'Français', notes: [] }
                ],
            };
            setEleves([...eleves, nouvelEleve]);
        }
    };

    const supprimerEleve = (index) => {
        const majEleves = [...eleves];
        majEleves.splice(index, 1);
        setEleves(majEleves);
    };

    const ajouterNote = (eleveIndex, matiereIndex) => {
        const nouvelleNote = prompt('Saisissez la note :');
        if (nouvelleNote && !isNaN(nouvelleNote)) {
            const majEleves = [...eleves];
            majEleves[eleveIndex].matieres[matiereIndex].notes.push(parseFloat(nouvelleNote));
            setEleves(majEleves);
        } else {
            alert('Saissisez uniquement une note valide');
        }
    };

    const modifierNote = (eleveIndex, matiereIndex) => {
        const editeNote = prompt('Saissiez la nouvelle note :');
        if (editeNote && !isNaN(editeNote)) {
            const majEleves = [...eleves];
            majEleves[eleveIndex].matieres[matiereIndex].notes = [parseFloat(editeNote)];
            setEleves(majEleves);
        } else {
            alert('Saissisez uniquement une note valide');
        }
    };

    const calculerMoyenneGlobale = (eleve) => {
        let totalNotes = 0;
        let nombreDeNotes = 0;

        eleve.matieres.forEach((matiere) => {
            matiere.notes.forEach((note) => {
                totalNotes += note;
                nombreDeNotes++;
            });
        });

        if (nombreDeNotes === 0) return 0;
        return totalNotes / nombreDeNotes;
    };

    return (
        <div className="container mx-auto">
            <div className='flex justify-center'>
                <button onClick={ajouterEleve} className="my-4 px-4 py-2 text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white rounded ">
                    Ajouter un élève
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nom de l'élève
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Matières
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Moyenne globale
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {eleves.map((eleve, eleveIndex) => (
                            <tr
                                key={eleveIndex}
                                className={`${eleveIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
                                    } border-b dark:border-gray-700`}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {eleve.nom}
                                </td>
                                <td className="px-6 py-4">
                                    {eleve.matieres.map((matiere, matiereIndex) => (
                                        <div key={matiereIndex} className="mb-2">
                                            <div className="flex justify-between items-center">
                                                <div>{matiere.nom} :</div>
                                                <div>
                                                    {matiere.notes.length > 0 ? (
                                                        <span>Notes: {matiere.notes.join(', ')}</span>
                                                    ) : (
                                                        <span>Aucune note</span>
                                                    )}
                                                    <button
                                                        onClick={() => modifierNote(eleveIndex, matiereIndex)}
                                                        className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                                    >
                                                        <IoIosCreate />
                                                    </button>
                                                    {matiere.notes.length === 0 && (
                                                        <button
                                                            onClick={() => ajouterNote(eleveIndex, matiereIndex)}
                                                            className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                        >
                                                            <IoIosAddCircle />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4">
                                    {calculerMoyenneGlobale(eleve).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => supprimerEleve(eleveIndex)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        <IoIosRemoveCircle />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Notes;
