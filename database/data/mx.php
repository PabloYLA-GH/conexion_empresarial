<?php

/*
 * Mexican sample data for factories and the demo seeder.
 * Faker has no es_MX locale, so anything that must look Mexican comes from here.
 */

return [
    // [region code, city, postal code prefix, phone area code]
    'cities' => [
        ['MX-CMX', 'Ciudad de México', '06', '55'],
        ['MX-JAL', 'Guadalajara', '44', '33'],
        ['MX-YUC', 'Mérida', '97', '999'],
        ['MX-NLE', 'Monterrey', '64', '81'],
        ['MX-PUE', 'Puebla', '72', '222'],
        ['MX-QUE', 'Querétaro', '76', '442'],
        ['MX-GUA', 'León', '37', '477'],
        ['MX-AGU', 'Aguascalientes', '20', '449'],
        ['MX-SLP', 'San Luis Potosí', '78', '444'],
        ['MX-OAX', 'Oaxaca de Juárez', '68', '951'],
        ['MX-VER', 'Xalapa', '91', '228'],
        ['MX-MIC', 'Morelia', '58', '443'],
        ['MX-CHP', 'Tuxtla Gutiérrez', '29', '961'],
        ['MX-SON', 'Hermosillo', '83', '662'],
        ['MX-BCN', 'Tijuana', '22', '664'],
        ['MX-ROO', 'Cancún', '77', '998'],
        ['MX-SIN', 'Culiacán', '80', '667'],
        ['MX-CHH', 'Chihuahua', '31', '614'],
        ['MX-MOR', 'Cuernavaca', '62', '777'],
        ['MX-ZAC', 'Zacatecas', '98', '492'],
    ],

    'business_prefixes' => [
        'Grupo', 'Comercializadora', 'Servicios', 'Soluciones', 'Distribuidora',
        'Constructora', 'Consultoría', 'Agroindustrias', 'Taller', 'Despacho',
        'Laboratorios', 'Café', 'Textiles', 'Muebles', 'Productos',
    ],

    'business_names' => [
        'del Bajío', 'Altiplano', 'Maya', 'Sierra Madre', 'Huasteca', 'Tláloc',
        'Mezquite', 'Xóchitl', 'Norteña', 'Pacífico', 'Jacaranda', 'Ahuehuete',
        'Cenote', 'Nopal', 'Tierra Fértil', 'Anáhuac', 'Cantera', 'Obsidiana',
        'Agave', 'Copal', 'Ocelote', 'Tepeyac', 'Zapoteca', 'Mixteca', 'Sotol',
    ],

    'legal_suffixes' => ['S.A. de C.V.', 'S. de R.L. de C.V.', 'S.C.', 'S.A.P.I. de C.V.'],

    'taglines' => [
        'Calidad mexicana para tu negocio.',
        'Soluciones a la medida desde %s.',
        'Productos locales con alcance nacional.',
        'Tu aliado para crecer en %s.',
        'Experiencia y compromiso en cada proyecto.',
        'Hecho en México, pensado para ti.',
    ],

    'products' => [
        'Café de altura', 'Fertilizante orgánico', 'Muebles de parota', 'Ropa de manta',
        'Miel de abeja', 'Salsas artesanales', 'Block de concreto', 'Mezcal artesanal',
        'Cerámica de Talavera', 'Bioestimulante foliar', 'Chocolate de mesa', 'Hamacas tejidas',
    ],

    'services' => [
        'Asesoría fiscal', 'Diseño de interiores', 'Desarrollo de sitios web',
        'Mantenimiento industrial', 'Consultoría legal', 'Gestión de redes sociales',
        'Instalación de paneles solares', 'Capacitación empresarial', 'Logística y transporte',
        'Auditoría contable', 'Fotografía de producto', 'Traducción técnica',
    ],

    'opportunity_titles' => [
        'strategic_alliance' => ['Alianza para exportar a Estados Unidos', 'Socio para abrir sucursal en el Bajío'],
        'supplier' => ['Proveedor de empaque biodegradable', 'Proveedor de materia prima certificada'],
        'collaborator' => ['Diseñador gráfico para catálogo', 'Contador para régimen RESICO'],
        'business_opportunity' => ['Distribución en tiendas de conveniencia', 'Venta en mercados de productores'],
    ],
];
