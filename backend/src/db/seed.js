require('dotenv').config()
const prisma = require('./prisma')

async function main() {
    await prisma.game.create({
        data: {
            imageBoardSource: 'https://i.redd.it/3azczwthxnne1.jpeg',
            characters: {
                // TODO: Update character positions after finding them... oof...
                create: [
                    {
                        name: 'Waldo',
                        XPosition: 1,
                        YPosition: 1,
                    },
                    {
                        name: 'Odlaw',
                        XPosition: 8,
                        YPosition: 8,
                    },
                    {
                        name: 'Wizard',
                        XPosition: 14,
                        YPosition: 14,
                    },
                ],
            },
        },
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
