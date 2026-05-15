export const muralismoCourseSeed = {
  id: "muralismo-vivo",
  title: "Muralismo Vivo",
  subtitle: "Del concepto al muro",
  description:
    "Laboratorio creativo para convertir ideas, emociones y problemáticas del entorno en una propuesta mural con narrativa visual, referentes, bocetación, composición y reflexión artística.",
  credits:
    "Un laboratorio creativo desarrollado como trabajo conjunto entre Musicala y Miguel Ángel Ballesteros.",
  teacherName: "Miguel Ángel Ballesteros",
  partnerName: "Musicala",
  status: "published",
  coverImage: "./assets/course-cover.svg",
  sessions: [
    {
      id: "sesion-01-conceptualizacion-narrativa",
      order: 1,
      title: "Conceptualización y narrativa del mural",
      summary:
        "Construye la idea general del mural, su intención artística, mensaje, temática, narrativa visual, referentes y bocetación inicial.",
      duration: "120 min",
      isPublished: true,
      videoUrl: "",
      resourceLinks: [
        {
          label: "Gran formato / muralismo en Colombia",
          url: "https://www.dmentalgraffitishop.com/gran-formato/"
        },
        {
          label: "Recurso mensaje y temática",
          url: "https://acortar.link/9j1P6c"
        },
        {
          label: "Tour de graffiti por Bogotá",
          url: "https://www.bogotraveltours.com/es/bogota/bogota-graffiti-tour-en-bicicleta/"
        },
        {
          label: "El graffiti en Bogotá",
          url: "https://culturarecreacionydeporte.gov.co/es/principal/noticias/el-grafiti-en-bogota-2024"
        },
        {
          label: "Murales de Banksy en Londres",
          url: "https://www.myartbroker.com/artist-banksy/guides/londons-top-12-banksy-murals"
        }
      ],
      contentHtml: `
        <h2>Conceptualización y narrativa del mural</h2>
        <p>La conceptualización del mural consiste en construir la idea general que dará sentido a toda la obra. En esta etapa se define qué se quiere comunicar, cuál será la intención artística y cómo se desarrollará visualmente la narrativa.</p>
        <p>Un mural no es solo una imagen decorativa; funciona como un discurso visual capaz de transmitir memorias, denuncias, emociones, identidades o reflexiones colectivas. Su narrativa se organiza mediante símbolos, personajes, colores y composiciones que permiten contar una historia o representar una problemática desde una perspectiva artística y social.</p>

        <h3>Idea central</h3>
        <p>La idea central es el eje principal sobre el cual se desarrolla el mural. Representa el concepto más importante de la obra y guía las decisiones visuales, compositivas, simbólicas y cromáticas.</p>
        <p>Puede surgir de una experiencia personal, una situación social, un hecho histórico, una identidad cultural o una reflexión colectiva. Tener una idea clara permite mantener coherencia entre imágenes, colores y elementos gráficos para que el mensaje final sea comprensible y significativo.</p>

        <h3>Mensaje y temática</h3>
        <p>El mensaje corresponde a aquello que el mural desea transmitir al público. La temática es el tema específico que aborda la obra. Por ejemplo, la temática puede ser el cuidado ambiental y el mensaje puede plantear que la naturaleza también guarda memoria de nuestras acciones.</p>
        <p>Un mural puede trabajar temáticas como memoria histórica, diversidad cultural, cuidado ambiental, resistencia social, identidad juvenil o transformación comunitaria. El mensaje puede ser explícito o simbólico, pero debe generar una conexión emocional o reflexiva con quienes observan la obra.</p>

        <h3>Investigación visual y referentes</h3>
        <p>La investigación visual consiste en recopilar imágenes, artistas, estilos y referencias relacionadas con la temática del mural. Esta búsqueda permite ampliar ideas, identificar recursos gráficos y enriquecer la propuesta estética.</p>
        <p>Los referentes pueden provenir del muralismo colombiano, el muralismo latinoamericano, el arte urbano, la fotografía, el cine, las culturas ancestrales o las expresiones visuales contemporáneas. Algunos referentes útiles para analizar son Diego Rivera, Omar Rayo, Banksy, Eduardo Kobra, Pablo Picasso y distintas experiencias de muralismo colombiano y latinoamericano.</p>

        <h3>Bocetación inicial</h3>
        <p>La bocetación inicial es el proceso de crear dibujos preliminares que permiten organizar las ideas antes de intervenir el muro. A través de los bocetos se prueban composiciones, distribuciones de personajes, relaciones de tamaño y posibilidades cromáticas.</p>
        <p>Esta etapa funciona como un laboratorio visual donde se corrigen errores, se prueban soluciones y se define la estructura general del mural. Un buen boceto facilita la planificación técnica y da mayor claridad durante la ejecución final de la obra.</p>
      `,
      activities: [
        {
          id: "actividad-01-concepto-referentes-boceto",
          title: "Idea central, referentes y bocetación inicial",
          type: "mixed",
          instructions:
            "Define la idea central de tu mural, escribe cuál sería su mensaje y temática, busca mínimo tres referentes visuales relacionados con tu propuesta y realiza una bocetación inicial en hojas blancas tamaño carta. Puedes variar el formato, pero debe estar trabajado a escala de una hoja. Usa lápiz, trazos rápidos y deja las correcciones para una etapa posterior. Ten en cuenta la idea central y el mensaje que quieres comunicar.",
          rubric: [
            "Claridad de la idea central",
            "Coherencia entre mensaje, temática y referentes",
            "Exploración visual en la bocetación",
            "Relación entre símbolos, composición e intención artística"
          ]
        }
      ]
    },
    {
      id: "sesion-02-composicion-visual",
      order: 2,
      title: "Composición visual y organización del espacio",
      summary:
        "Trabaja cómo organizar elementos dentro del mural para construir una imagen coherente, armónica y comunicativa.",
      duration: "120 min",
      isPublished: true,
      videoUrl: "",
      resourceLinks: [
        {
          label: "Teoría de composición visual en Scratch",
          url: "#"
        }
      ],
      contentHtml: `
        <h2>Composición visual y organización del espacio</h2>
        <p>La composición visual es la manera en que se organizan todos los elementos dentro del mural para construir una imagen coherente, armónica y comunicativa. Define cómo interactúan figuras, colores, líneas y espacios dentro del formato mural.</p>
        <p>Una buena organización del espacio permite dirigir la mirada del espectador, generar equilibrio y reforzar el mensaje de la obra. En los murales, la composición adquiere gran importancia por el tamaño del soporte y por la necesidad de mantener claridad visual desde diferentes distancias y ángulos de observación.</p>

        <h3>Equilibrio visual</h3>
        <p>El equilibrio visual se refiere a la distribución armónica de elementos, formas, colores, tamaños y espacios dentro de la composición. Busca estabilidad para evitar que una parte del mural se perciba más pesada o saturada que otra.</p>
        <p>El equilibrio puede ser simétrico, cuando los elementos se organizan de manera similar a ambos lados de la composición, o asimétrico, cuando se usan contrastes y diferentes pesos visuales para generar dinamismo sin perder armonía.</p>

        <h3>Jerarquías y puntos focales</h3>
        <p>Las jerarquías visuales definen qué elementos captan primero la atención del espectador. A través del tamaño, color, iluminación, contraste o ubicación, algunos elementos adquieren mayor importancia dentro de la composición.</p>
        <p>El punto focal es el área principal hacia donde se dirige inicialmente la mirada y suele contener el mensaje más significativo del mural. Organizar correctamente las jerarquías ayuda a construir una narrativa visual clara y evita que todos los elementos compitan entre sí.</p>

        <h3>Ritmo y movimiento</h3>
        <p>El ritmo visual se genera mediante la repetición de formas, líneas, colores o patrones que producen continuidad dentro de la obra. Este recurso permite crear sensación de movimiento y guiar la mirada del espectador a través del mural.</p>
        <p>El movimiento visual puede ser dinámico o suave dependiendo de la dirección de las líneas, la posición de las figuras y la secuencia compositiva. En el muralismo, el ritmo conecta escenas o elementos y aporta fluidez a la composición general.</p>

        <h3>Distribución de elementos en gran formato</h3>
        <p>En un mural, la distribución de los elementos debe adaptarse al tamaño del espacio y a la distancia desde la cual serán observados. Trabajar en gran formato implica pensar en escala, proporción, legibilidad e impacto.</p>
        <p>Los elementos principales suelen ubicarse en zonas estratégicas para facilitar la lectura visual, mientras que los espacios vacíos permiten respiración y equilibrio compositivo. Una buena distribución evita la saturación y permite que el mural conserve claridad y fuerza visual.</p>
      `,
      activities: [
        {
          id: "actividad-02-analisis-composicion",
          title: "Análisis de composición y organización del espacio",
          type: "mixed",
          instructions:
            "Analiza una obra mural, preferiblemente El lanzador de flores de Banksy, identificando equilibrio visual, jerarquías, puntos focales, ritmo, movimiento y distribución de elementos en gran formato. Luego aplica ese análisis a tu propio boceto: marca el punto focal principal, los elementos secundarios, la dirección de lectura visual, el tipo de equilibrio y las zonas de mayor peso visual.",
          rubric: [
            "Identificación clara de equilibrio visual",
            "Reconocimiento de jerarquías y puntos focales",
            "Comprensión del ritmo y movimiento visual",
            "Aplicación del análisis al propio boceto",
            "Organizacion clara del espacio mural"
          ]
        }
      ]
    }
  ]
};
