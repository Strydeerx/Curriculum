
const router = require("express").Router();
const { Proyecto, Empresa, DatosPersonales, sequelize } = require("../model/registro.module");

// Crear un nuevo registro de proyecto
router.post("/proyectos", async (req, res) => {
    const { nombreproyecto, idempresa, fecha_inicio, descripcion, idlider, integrantesproyecto } = req.body;

    if (!nombreproyecto || !idempresa || !fecha_inicio || !idlider || !integrantesproyecto) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "Todos los campos son obligatorios",
        });
    }

    try {
        const liderExistente = await DatosPersonales.findByPk(idlider);
        if (!liderExistente) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "El líder no existe",
            });
        }

        const empresaExistente = await Empresa.findByPk(idempresa);
        if (!empresaExistente) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "La empresa no existe",
            });
        }

        const result = await sequelize.transaction(async (t) => {
            const proyecto = await Proyecto.create({
                nombreproyecto,
                idempresa,
                fecha_inicio,
                descripcion,
                idlider,
                integrantesproyecto
            }, { transaction: t });

            return proyecto;
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Proyecto creado",
            data: result,
        });
    } catch (error) {
        console.error("Error al crear el proyecto:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al crear el proyecto",
            error: error.message,
        });
    }
});

// Obtener todos los proyectos
router.get("/proyectos", async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll({
            include: [
                { model: Empresa, attributes: ['nombreempresa'] },
                { model: DatosPersonales, attributes: ['nombre', 'apellidop', 'apellidom'] }
            ]
        });
        res.status(200).json({
            ok: true,
            status: 200,
            data: proyectos,
            message: "Consulta exitosa",
        });
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error en la consulta",
            error: error.message,
        });
    }
});

// Obtener un proyecto por ID
router.get("/proyectos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const proyecto = await Proyecto.findOne({
            where: { idproyecto: id },
            include: [
                { model: Empresa, attributes: ['nombreempresa'] },
                { model: DatosPersonales, attributes: ['nombre', 'apellidop', 'apellidom'] }
            ]
        });
        if (!proyecto) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Proyecto no encontrado",
            });
        }
        res.status(200).json({
            ok: true,
            status: 200,
            data: proyecto,
            message: "Consulta exitosa",
        });
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error en la consulta",
            error: error.message,
        });
    }
});

// Actualizar un proyecto
router.put("/proyectos/:id", async (req, res) => {
    const { id } = req.params;
    const { nombreproyecto, idempresa, fecha_inicio, descripcion, idlider, integrante1, integrante2, integrante3 } = req.body;

    if (!nombreproyecto || !idempresa || !fecha_inicio || !idlider || !integrante1 || !integrante2 || !integrante3) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "Todos los campos son obligatorios",
        });
    }

    try {
        const liderExistente = await DatosPersonales.findByPk(idlider);
        if (!liderExistente) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "El líder no existe",
            });
        }

        const empresaExistente = await Empresa.findByPk(idempresa);
        if (!empresaExistente) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "La empresa no existe",
            });
        }

        const integrantesproyecto = `${integrante1}, ${integrante2}, ${integrante3}`;

        const result = await sequelize.transaction(async (t) => {
            const proyecto = await Proyecto.update({
                nombreproyecto,
                idempresa,
                fecha_inicio,
                descripcion,
                idlider,
                integrantesproyecto
            }, {
                where: { idproyecto: id },
                transaction: t
            });

            return proyecto;
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Proyecto actualizado",
            data: result,
        });
    } catch (error) {
        console.error("Error al actualizar el proyecto:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al actualizar el proyecto",
            error: error.message,
        });
    }
});

// Eliminar un proyecto
router.delete("/proyectos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const proyecto = await Proyecto.findByPk(id);
        if (!proyecto) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Proyecto no encontrado",
            });
        }

        await Proyecto.destroy({ where: { idproyecto: id } });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Proyecto eliminado",
        });
    } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al eliminar el proyecto",
            error: error.message,
        });
    }
});

// Obtener todas las empresas
router.get("/empresas", async (req, res) => {
    try {
        const empresas = await Empresa.findAll({
            attributes: ['idempresa', 'nombreempresa']
        });
        res.status(200).json(empresas);
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error en la consulta",
            error: error.message,
        });
    }
});

// Obtener todos los datos personales
router.get("/datospersonales", async (req, res) => {
    try {
        const datospersonales = await DatosPersonales.findAll({
            attributes: ['idpersona', 'nombre', 'apellidop', 'apellidom']
        });
        res.status(200).json(datospersonales);
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error en la consulta",
            error: error.message,
        });
    }
});

// Obtener los nombres de los proyectos
router.get("/nombreproyectos", async (req, res) => {
    try {
        const nombreproyectos = await Proyecto.findAll({
            attributes: ['nombreproyecto']
        });
        res.status(200).json({
            ok: true,
            status: 200,
            data: nombreproyectos,
            message: "Consulta exitosa",
        });
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error en la consulta",
            error: error.message,
        });
    }
});

module.exports = router;


