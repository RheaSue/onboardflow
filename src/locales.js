// 创建一个语言管理对象来加载不同的语言文件
const locales ={
    en: {
        selectSupportModel: "Select support model",

        back: "Back",
        firstTitle: "Plug into power outlet",
        firstDescription: (deviceType) => `Install ${deviceType} as close to the center of main floor to maximize Wi-Fi coverage.`,

        secondTitle: "Keep it clear from obstructions",
        secondDescription: (deviceType) => `For the best Wi-Fi experience, make sure ${deviceType} is visible and not blocked by furniture or large objects.`,

        thirdTitle: "Check light status",
        thirdDescription: (deviceType) => `The front light should be slowly blinking white to show it is ready to be paired. If not, unplug then plug the ${deviceType} back in and wait until it starts blinking white.<br /><br />If after 2 minutes it is still not blinking white, you can try to do a factory reset by holding the Reset pin-hole button for more than 10 seconds. Then, wait for the slow blinking white light before continuing.`,

        led: "LED",
        slowbliking: "Slow blinking",
        blinking: "Blinking",
        booting: "Booting",
        enablingwifi: "Enabling Wi-Fi",
        readyToBePaired: "Ready to be paired",
        green: "(Green)",
        white: "(White)",
        whiteGreen: "(White, Green)",

        footerFirstLine: "Creating technology for",
        footerSecondLine: "tomorrow's networks",
    },

    fr: {
        selectSupportModel: "Sélectionner le modèle de soutien",

        back: "Retour",
        firstTitle: "Branchez sur une prise de courant",
        firstDescription: (deviceType) => `Installez ${deviceType} aussi près que possible du centre du rez-de-chaussée pour maximiser la couverture Wi-Fi.`,

        secondTitle: "Gardez-le dégagé d'obstructions",
        secondDescription: (deviceType) => `Pour la meilleure expérience Wi-Fi, assurez-vous que ${deviceType} est visible et non bloqué par des meubles ou de grands objets.`,

        thirdTitle: "Vérifiez l'état de la lumière",
        thirdDescription: (deviceType) => `La lumière frontale doit clignoter lentement en blanc pour indiquer qu'elle est prête à être associée. Sinon, débranchez puis rebranchez le ${deviceType} et attendez qu'il commence à clignoter en blanc.<br /><br />Si après 2 minutes, il ne clignote toujours pas en blanc, vous pouvez essayer de réinitialiser l'appareil en maintenant enfoncé le bouton de réinitialisation pendant plus de 10 secondes. Ensuite, attendez la lumière blanche clignotante lente avant de continuer.`,

        led: "DEL",
        slowbliking: "Clignotement lent",
        blinking: "Clignotement",
        booting: "Démarrage",
        enablingwifi: "Activation du Wi-Fi",
        readyToBePaired: "Prêt à être associé",
        green: "(Vert)",
        white: "(Blanc)",
        whiteGreen: "(Blanc, Vert)",

        footerFirstLine: "Créer une technologie pour",
        footerSecondLine: "les réseaux de demain",
    }
}
