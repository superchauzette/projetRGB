#PROJET RGB

### 1.  Présentation du projet

**L’idée principale du projet était de créer une lampe simulant le lever du soleil**.


De nouvelles fonctions se sont progressivement ajoutées au projet afin de contrôler la lampe à l'aide :
* d'un bouton tactile, le Qtouch
* d'une interface web compatible smartphone

Et d'autres sont à venir :
* Fonction réveil
* Commande vocale
* Amélioration de l'IHM web


Un projet github a été créé afin de mettre à disposition les sources du projet. Nous sommes deux sur cette idée, l’un s’occupe de la partie électronique, et l’autre de la partie programmation.

Toutes les idées nouvelles, les conseils sont bien sûr les bienvenus. Pour vous mettre en appétit, voici le premier prototype de notre lampe RGB, sur une plaque en bois pour faire tous nos tests :

![montage.jpg](http://drive.google.com/uc?export=view&id=0B1v5k51FDCryWW9SWlFtOUFXNWc)


### 2.	Hardware : Schéma électronique

Le schéma électronique présenté ci-dessous est la version actuelle du projet.

![Schematic.png](http://drive.google.com/uc?export=view&id=0B1v5k51FDCryV2F5TVNGM0FrbXc)

Quelques cartes prototype nous ont permis d’arriver à ce tracé. Au final, le typon de la carte est le suivant :

![typon](http://drive.google.com/uc?export=view&id=0B1v5k51FDCryMHpxT0xaeVRldEU)


Cette carte est pluggable directement sur le Raspberry par l’intermédiaire des ports GPIO, et possède des trous de fixation pour être maintenu en place. D’autre part, le montage complet est alimenté en 12V, le 5V nécessaire au fonctionnement du Raspberry est assuré par un convertisseur DC/DC. Le montage intègre aussi un composant CMS qui est un QTouch QT1070. Il permet, par l’intermédiaire du port I2C du Raspberry, de mettre en place des touches tactiles.

Le montage actuel est dimensionné pour driver une LED de 10W qui possède les caractéristiques suivantes :

•	Rouge : Tension 7-8V, Courant 350 mA
•	Bleu : Tension 10-11V, Courant 350 mA
•	Vert : Tension 10-11V, Courant 350 mA

Les transistors utilisés sont surdimensionnés afin de pouvoir commander des LEDs d’une puissance supérieure, 30W par exemple. Il est alors nécessaire de recalculer les résistances de puissance R…. pour changer la limitation de courant dans les LEDs, actuellement fixée à 350 mA. Cette limitation effectuée de manière logicielle après avoir contrôlé le courant afin de ne pas sur-stresser la LED. La puissance admissible par les résistances de puissances est aussi à recalculer en cas d’utilisation d’une LED plus puissante faisant appel à des courants plus élevés.

Lors des premiers tests, un problème à été soulevé : le courant de fuite des transistors était assez important pour que certaines LEDs restent allumées même avec le PWM à 0. Ceci est handicapant pour notre projet puisque cette lampe est destinée à être installée dans une chambre. L’ajout de résistances de pull-up R…. ont permis de résoudre ce problème.

D’après nos calculs, les transistors n’ont pas besoin de dissipateurs, ils peuvent fonctionner jusqu’à environ 3A dans un environnement à 40-50° avec une marge correcte de sécurité.

###3)	Software : Installation des éléments nécessaires au projet

L'ensemble du projet est codé en javascript avec NodeJS. Si vous ne connaissez pas [NodeJS](http://nodejs.org/) il s'agit simplement du langage javascript accesible côté serveur (ou Raspberry), l'avantage du language est qu'il est basé sur les évènements et qu'il est non bloquant. Nous avons eu beaucoup de soucis avec cette histoire de node js pour son installation. Les méthodes les plus courantes d’installation nous donnaient souvent des erreurs de versions  qui ne correspondent pas. Avec les commandes suivantes, plus aucuns soucis, une installation propre !

Pour l'installer tapez dans la console :

```
apt-get update
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
dpkg -i node_latest_armhf.deb```

Le programme installe également npm, le gestionnaire de paquets officiel pour Node.js

#### a. Commande d’une LED RGB : Gestion du PWM avec le Raspberry

La commande de la LED RGB va se faire avec le raspebbry avec les sorties GPIO commutées en PWM. Le principe est d'alumer et d'éteindre la lampe plusieurs fois par seconde.
L'excellente librairie [pi-blaster](https://github.com/sarfata/pi-blaster) permet de faire du PWM facilement, en hardware et non en software comme certaines solutions proposées. 

L’installation est assez simple, il suffit de télécharger le projet et de l’installer de la manière suivante :

```
sudo wget https://github.com/sarfata/pi-blaster/archive/master.zip
sudo unzip master.zip
cd pi-blaster-master
sudo make pi-blaster
sudo reboot```

L’activation du PWM sur les pins GPIO se fait à l’aide de la commande :

```
cd pi-blaster-master
sudo ./pi-blaster```

Attention, cette activation ne sera plus valide au prochain démarrage, le insstall ne fonctionne pas avec ma version de raspbian, je ne sais pas trop pourquoi. De toute façon, il sera activé par le projet RGB.

Ensuite, nous pouvons par exemple allumer la broche 22 à 20% de la puissance maximale en écrivant ceci dans la ligne de commande :

```
sudo echo "22=0.2" > /dev/pi-blaster```

L'auteur à également rendu son programme accessible depuis NodeJS : [pi-blaster.js](https://github.com/sarfata/pi-blaster.js) on l'installe en faisant : 
```
sh
npm install pi-blaster.js```


On utilise quoi nous alors au final............

programme lever du soleil ....

#### b. Commande de la led avec un bouton tactille, le Qtouch avec l'interface i2c

Le Qtouch est conne connecté en i2c. Il est nécessaire d’activer l'i2c sur le Raspberry. Il est possible de le faire en ligne de commande, cependant, les versions de Rasbian évoluant assez vite, la méthode que nous utilisions avant ne fonctionnait plus après une réinstallation complète du projet. La méthode graphique suivante à l’avantage de fonctionner pour toutes les versions !

On installe la library de l’i2c :

```
sudo apt-get install python-smbus
sudo apt-get install i2c-tools```

Ensuite, on active l’i2c avec le raspi-config

```
sudo raspi-config
Advanced options
I2C
YES
YES```

On en profite pour faire un Expand filesystem si on ne l’a pas fait pour avoir accès à l’ensemble de la carte SD du Raspberry. Nous pouvons aussi en profiter pour changer le mot de passe du Raspberry !

Et on reboot :
```
sudo reboot```

Au redémarrage, il est nécessaire d’éditer le fichier suivant :

```
sudo nano /etc/modules```

On ajoute les deux lignes suivantes :

```
i2c-bcm2708 
i2c-dev```

Ensuite, nous pouvons contrôler le bon fonctionnement de l’i2C à l’aide de la commande suivante :

```
sudo i2cdetect -y 1```

(ou sudo i2cdetect -y 0 en fonction de la version de votre rapsberry)

#### c. Commande de la led via une interface web

#####c.1. Installation du projetRGB

Le projet est présent sur [GitHub](https://github.com/superchauzette/projetRGB).

Il suffit alors de le télécharger et de l’installer à la racine :

```
wget https://github.com/superchauzette/projetRGB/archive/master.zip
unzip master.zip
cd projetRGB-master
sudo npm install```

Ensuite, pour lancer le projet, nous faisons :

```
sudo node app.js```

Il sera alors affiché une écoute du port 3000 qui sera le port de l’interface web.

#####c.2. Présentation de l’interface WEB

Pour avoir accès à l’interface web, après avoir lancé notre app.js, il suffit d’entrer sur l’ordinateur l’adresse ip du raspberry suivis de :3000. Ceci n’est valable que pour un PC présent dans le même réseau que le raspberry, depuis l’extérieur, il est nécessaire d’ouvrir le port 3000 sur votre box internet et de rentrer l’adresse ip publique avec une redirection de ports. Ces informations sont facilement trouvables sur le net.

Alors voici la version actuelle, amenée à évoluer, de notre interface web :

A AJOUTER

Elle permet de choisir une couleur, la luminosité de la led, d’allumer la led en blanc, et d’utiliser la fonction de lever de soleil.


#### f.	Autres

#####f.1. Installation d’une clé Wifi

Je suis tombé sur une clé wifi nos pris en charge nativement par le raspberry (alors qu’elle devait l’être à l’origine…) Je vous déconseille cette clé (identifiée par , mais si jamais vous en avez une sous la main, voici pour moi la solution ultime, après être passé par des recompilation de linux interminables et qui ne fonctionnait pas à tous les coups ! Attention, le driver présenté ici n’est valable que pour le kernel 3.18.7+ #755 pour les raspberry de première génération. Je me suis aidé de ce [post](http://www.raspberrypi.org/forums/viewtopic.php?f=28&t=49864&hilit=mt7601&start=200).

```
cd /tmp
wget https://dl.dropboxusercontent.com/u/67643651/mt7601_3.18.7_755.tar.gz
sudo tar xf mt7601_3.18.7_755.tar.gz -C /
sudo depmod 3.18.7+
sudo reboot```

Ensuite, il est nécessaire de configurer le démarrage automatique de notre clé wifi :

```
sudo nano /etc/network/interfaces```

Et écrire les paramètres suivants

```
auto lo

iface lo inet loopback
iface eth0 inet dhcp

auto ra0
allow-hotplug ra0
iface ra0 inet dhcp
wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp```

Ensuite, nous pouvons ajouter nos paramètres wifi en éditant le fichier suivant :

```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf```

Il doit contenir les informations suivantes :

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
        ssid="YOURWIFINAME"
        key_mgmt=WPA-PSK
        psk="YOURPASSWORD"
}```

#####f.2. Programme lever du soleil : Je ne sais pas trop ou le mettre

L'histoire de créer un script qui permet de défiler les couleurs représentatives du lever du soleil n'est pas si évidente que cela. En effet, la lumière perçu sur la terre lors du lever du soleil est dépendante de nombreux paramètres, et en fonction du temps et du lieu, les couleurs peuvent être radicalement différentes.

Nous nous sommes alors basés sur les informations que nous avons trouvé sur le net. La lumière du soleil est souvent traduite en degrés Kelvin. Nous avons alors pris différents points caractéristiques de la position du soleil au cour de la journée, et nous avons créé une courbe permettant de faire défiler les températures de couleur afin de simuler le lever de soleil. Ensuite, une conversion des degrès Kelvin vers les degrés RGB est effectuée.
http://philippe.balladur.free.fr/Fiches_techniques/Temp_couleur_BdB.htm
http://www.ephotozine.com/article/guide-to-colour-temperature-4804


