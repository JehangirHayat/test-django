from import_export import resources,fields
from .models import AAEnergiesDatuak
from import_export.widgets import DateTimeWidget
from import_export.widgets import FloatWidget

class FloatCommaWidget(FloatWidget):
    def clean(self, value, row=None, *args, **kwargs):
        if isinstance(value, str):
            value = value.replace(',', '.').strip()
        return super().clean(value, row, *args, **kwargs)

# Hay q hacer un widget o en el views para quitar el titulo
#mirar para hacer esta mierda dinamicamente a ver si se puede


class DataResources(resources.ModelResource):
    fecha_hora = fields.Field(
        attribute='fecha_hora', 
        column_name='Fecha/hora',
        widget=DateTimeWidget(format='%d/%m/%Y %H:%M')  
    )
    corriente_l1 = fields.Field(attribute='corriente_l1', column_name='Corriente L1 (A)', widget=FloatCommaWidget())
    corriente_l2 = fields.Field(attribute='corriente_l2', column_name='Corriente L2 (A)', widget=FloatCommaWidget())
    corriente_l3 = fields.Field(attribute='corriente_l3', column_name='Corriente L3 (A)', widget=FloatCommaWidget())
    corriente_neutro = fields.Field(attribute='corriente_neutro', column_name='Corriente de neutro (A)', widget=FloatCommaWidget())
    p_activa_L1 = fields.Field(attribute='p_activa_L1', column_name='P.Activa L1 (kW)', widget=FloatCommaWidget())
    p_activa_L2 = fields.Field(attribute='p_activa_L2', column_name='P.Activa L2 (kW)', widget=FloatCommaWidget())
    p_activa_L3 = fields.Field(attribute='p_activa_L3', column_name='P.Activa L3 (kW)', widget=FloatCommaWidget())
    cos_Phi_L1 = fields.Field(attribute='cos_Phi_L1', column_name='Cos Phi L1', widget=FloatCommaWidget())
    cos_Phi_L2 = fields.Field(attribute='cos_Phi_L2', column_name='Cos Phi L2', widget=FloatCommaWidget())
    cos_Phi_L3 = fields.Field(attribute='cos_Phi_L3', column_name='Cos Phi L3', widget=FloatCommaWidget())
    p_capacitivia_L1 = fields.Field(attribute='p_capacitivia_L1', column_name='P.Capacitiva L1 (kvarC)', widget=FloatCommaWidget())
    p_capacitivia_L2 = fields.Field(attribute='p_capacitivia_L2', column_name='P.Capacitiva L2 (kvarC)', widget=FloatCommaWidget())
    p_capacitivia_L3 = fields.Field(attribute='p_capacitivia_L3', column_name='P.Capacitiva L3 (kvarC)', widget=FloatCommaWidget())
    frecuencia = fields.Field(attribute='frecuencia', column_name='Frecuencia (Hz)', widget=FloatCommaWidget())
    p_inductiva_L1 = fields.Field(attribute='p_inductiva_L1', column_name='P.Inductiva L1 (kvarL)', widget=FloatCommaWidget())
    p_inductiva_L2 = fields.Field(attribute='p_inductiva_L2', column_name='P.Inductiva L2 (kvarL)', widget=FloatCommaWidget())
    p_inductiva_L3 = fields.Field(attribute='p_inductiva_L3', column_name='P.Inductiva L3 (kvarL)', widget=FloatCommaWidget())
    tension_l1 = fields.Field(attribute='tension_l1', column_name='Tensión L1 (V)', widget=FloatCommaWidget())
    tension_l12 = fields.Field(attribute='tension_l12', column_name='Tensión L12 (V)', widget=FloatCommaWidget())
    tension_l2 = fields.Field(attribute='tension_l2', column_name='Tensión L2 (V)', widget=FloatCommaWidget())
    tension_l23 = fields.Field(attribute='tension_l23', column_name='Tensión L23 (V)', widget=FloatCommaWidget())
    tension_l3 = fields.Field(attribute='tension_l3', column_name='Tensión L3 (V)', widget=FloatCommaWidget())
    tension_l31 = fields.Field(attribute='tension_l31', column_name='Tensión L31 (V)', widget=FloatCommaWidget())

    class Meta:
        model = AAEnergiesDatuak
        import_id_fields = ['fecha_hora']
        skip_unchanged = True
        fields = (
            'fecha_hora', 'corriente_l1', 'corriente_l2', 'corriente_l3',
            'corriente_neutro', 'p_activa_L1', 'p_activa_L2', 'p_activa_L3',
            'cos_Phi_L1', 'cos_Phi_L2', 'cos_Phi_L3', 'frecuencia',
            'p_capacitivia_L1', 'p_capacitivia_L2', 'p_capacitivia_L3',
            'p_inductiva_L1', 'p_inductiva_L2', 'p_inductiva_L3',
            'tension_l1', 'tension_l12', 'tension_l2', 'tension_l23',
            'tension_l3', 'tension_l31'
        )
        

