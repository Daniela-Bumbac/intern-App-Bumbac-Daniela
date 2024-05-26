import {useEffect, useState} from "react";
import styles from "./home.module.scss";

type Card = {
    id: number;
    title: string | null;
    description: string | null;
};

const Home = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleAdd = () => {
        const newCard = {
            id: cards.length + 1,
            title: newTitle,
            description: newDescription
        };
        setCards([...cards, newCard]);
        setNewTitle('');
        setNewDescription('');
    };

    const handleUpdate = (id: number) => {
        const title = prompt("Enter new title");
        const description = prompt("Enter new description");

        const updatedCards = cards.map(card => {
            if (card.id === id) {
                return { ...card, title, description };
            }
            return card;
        });

        setCards(updatedCards);
    };

    const handleDelete = (id: number) => {
        setCards(cards.filter(card => card.id !== id));
    };

    // Initial load of mock data
    useEffect(() => {
        setCards([
            { id: 1, title: "First Card", description: "This is the first card's description." },
            { id: 2, title: "Second Card", description: "This is the second card's description." }
        ]);
    }, []);

    return (
        <div
            style={
                {
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: '90vh',
                    width: '100%',
                }
            }
        >
            <h1>Welcome!</h1>
            <div>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" />
                <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Description" />
                <button onClick={handleAdd}>Add Card</button>
            </div>
            {cards.map(card => (
                <div key={card.id} className={styles.card}>
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                    <button onClick={() => handleUpdate(card.id)}>Update</button>
                    <button onClick={() => handleDelete(card.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Home;
