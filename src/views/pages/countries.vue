<template>
<v-row>
  <v-col
    cols="12"
    class="mb-6"
  >
    <v-card>
      <v-card-title>
        Países
        <v-spacer />
        <v-btn
          icon
          @click="dialog = true"
        >
          <v-icon
            dark
            color="primary"
            v-if="usersAdmin.escribir"
          >
            {{ icons.mdiEarthPlus  }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row class="ma-0">
          <v-col
            sm="12" 
          >
            <v-data-table
              :headers="headers"
              :items="data"
              :items-per-page="10"
              :search="search"
              class="elevation-1"
              sort-by="nombre">
            >
              <template #[`item.imagen`]="{ item }">
                <div>
                    <!--img :src="'http://127.0.0.1:8000'+item.imagen" fluid alt="Responsive image" width="30%" height="30%"-->
                    <img :src="item.imagen" fluid alt="Responsive image" width="30%" height="30%">
                </div>
              </template>

              <template #[`item.kycventa`]="{ item }">
                <v-icon
                  dark
                  color="primary"
                  v-if="item.kycventa"
                >
                  {{ icons.mdiCheckCircle  }}
                </v-icon>
                <v-icon
                  dark
                  color="primary"
                  v-else
                >
                  {{ icons.mdiCancel  }}
                </v-icon>
              </template>
              <template #[`item.kyccompra`]="{ item }">
                <v-icon
                  dark
                  color="primary"
                  v-if="item.kyccompra"
                >
                  {{ icons.mdiCheckCircle  }}
                </v-icon>
                <v-icon
                  dark
                  color="primary"
                  v-else
                >
                  {{ icons.mdiCancel  }}
                </v-icon>
              </template>
              <template #[`item.habilitado`]="{ item }">
                  <v-switch
                    v-model="item.habilitado"

                    @change="actualizarEstatus(item)"
                  />
              </template>
      
              <template #[`item.acciones`]="{ item }">
                <v-btn
                  icon
                  dark
                  color="primary"
                  @click="openEditar(item)"
                >
                  <v-icon>{{ icons.mdiPencil }}</v-icon>
                </v-btn>
                <v-btn
                  icon
                  dark
                  color="#E53935"
                  @click="openDelete(item)"
                >
                  <v-icon>{{ icons.mdiDelete }}</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
    <!-- DIALOG CREAR PAIS-->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            dark
            icon
            class="white--text"
            @click="dialog = false"
          >
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Crear nuevo País</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-3">
                <v-text-field
                  v-model="nombre"
                  outlined
                  label="Nombre"
                  placeholder="Nombre del Pais"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-3">
                <v-text-field
                  v-model="coin"
                  outlined
                  label="Moneda"
                  placeholder="Moneda"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <!--v-col class="col-3">
                <v-text-field
                  v-model="tasa"
                  outlined
                  label="tasa"
                  placeholder="tasa"
                  hide-details
                  class="mb-3"
                  dense
                />
              </!v-col-->
              <v-col class="col-2 mb-0">
                <v-switch
                  v-model="kycventa"
                  label="Venta FIAT Habilitado"
                  outlined
                  dense
                />
              </v-col>

              <v-col class="col-2 mb-0">
                <v-switch
                  v-model="kyccompra"
                  label="Compra FIAT Habilitado"
                  outlined
                  dense
                />coin
              </v-col>

              <!--v-col class="col-2">
                <v-text-field
                  v-model="montocompra"
                  outlined
                  label="Monto mínimo Compra"
                  placeholder="Monto mínimo Compra"
                  hide-details
                  class="mb-3"
                  type="number"
                  dense
                />
              </!--v-col>
              <v-col-- class="col-2">
                <v-text-field
                  v-model="montoventa"
                  outlined
                  label="Monto mínimo Venta"
                  placeholder="Monto mínimo Venta"
                  hide-details
                  class="mb-3"
                  type="number"
                  dense
                />
              </v-col-->



              <v-form
                  ref="form"
                  v-model="valid1"
                  lazy-validation
                >
                  <v-row>
                    <v-col
                      md="10"
                    >
                      <v-file-input 
                        @change="Preview_image"
                        v-model="registro.imagen"
                        accept="image/*"
                        label="Cargar nueva Bandera"
                      />
                    </v-col>
                    <v-col
                        md="2"
                      >
                        <v-btn
                          icon
                          x-large
                          color="primary"
                          @click="uploadBandera"
                        >
                          <v-icon>
                            mdi-upload
                          </v-icon>
                        </v-btn>
                      </v-col>
                  </v-row>
                  <v-img :src="url"></v-img>
           
                </v-form>              
              
              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialog = false, createCountry()"
              >
                Guardar
              </v-btn>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>coin
    </v-dialog>
    <!-- FIN DIALOG CREAR PAIS-->

    <!-- DIALOG EDITAR PAIS-->
    <v-dialog
      v-model="dialog_edit"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          color="primary"
        >
          <v-btn
            dark
            icon
            class="white--text"
            @click="dialog_edit = false"
          >
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Edición de País</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-2">
                <div>
                    <img :src="registro.imagen" fluid alt="Responsive image" width="50%" height="50%">
                    <!--img :src="'http://127.0.0.1:8000'+registro.imagen" fluid alt="Responsive image" width="50%" height="50%"-->
                </div>
              </v-col>
              <v-col class="col-3">
                <v-text-field
                  v-model="registro.nombre"
                  outlined
                  label="Nombre"
                  placeholder="Nombre del País"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-3">
                <v-text-field
                  v-model="registro.coin"
                  outlined
                  label="Moneda"
                  placeholder="Moneda"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-2 mb-0">
                <v-switch
                  v-model="registro.kycventa"
                  label="Venta FIAT Habilitado"
                  outlined
                  dense
                />
              </v-col>

              <v-col class="col-2 mb-0">
                <v-switch
                  v-model="registro.kyccompra"
                  label="Compra FIAT Habilitado"
                  outlined
                  dense
                />
              </v-col>
              <!--v-col class="col-2">
                <v-text-field
                  v-model="registro.montocompra"
                  outlined
                  label="Monto mínimo Compra"
                  placeholder="Monto mínimo Compra"
                  hide-details
                  class="mb-3"
                  type="number"
                  dense
                />
              </!--v-col>
              <v-col-- class="col-2">
                <v-text-field
                  v-model="registro.montoventa"
                  outlined
                  label="Monto mínimo Venta"
                  placeholder="Monto mínimo Venta"
                  hide-details
                  class="mb-3"
                  type="number"
                  dense
                />
              </v-col-->


              <v-col class="col-3 mb-0">
                <v-switch
                  v-model="registro.habilitado"
                  label="El País esta habilitado?"
                  outlined
                  dense
                />
              </v-col>
              <!--v-col class="col-3">
                <v-text-field
                  v-model="registro.tasa"
                  outlined
                  label="Tasa USDT"
                  placeholder="Tasa USDT"
                  hide-details
                  class="mb-3"
                  dense
                />
              </!--v-col-->
              <v-col class="col-6 mb-0">
                <v-form ref="form" v-model="valid1" lazy-validation>
                  <v-row>
                    <v-col md="10">
                      <v-file-input @change="Preview_image" v-model="registro.imagen" accept="image/*" label="Cargar Bandera" />
                    </v-col>
                    <v-col md="2">
                      <v-btn icon x-large color="primary" @click="uploadBandera">
                        <v-icon>
                          mdi-upload
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-img :src="url"></v-img>
                </v-form>
              </v-col>
              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialog_edit = false, guardarEdicion()"
              >
                Guardar
              </v-btn>
              
              <v-row>
                <!-- Documentos por País-->
                <v-col cols="12" class="mb-6">
                  <v-card>
                    <v-card-title>
                      Documentos para validar KYC por País
                      <v-spacer />
                      <v-btn icon @click="dialogDoc = true">
                        <v-icon dark color="primary" v-if="usersAdmin.escribir">
                          {{ icons.mdiTextBoxPlusOutline }}
                        </v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-row class="ma-0">
                        <v-col sm="12">
                          <v-data-table :headers="headersDoc" :items="dataDoc" :items-per-page="10" :search="search"
                            class="elevation-1">
                            <!--template #[`item.opcional`]="{ item }">
                              <v-chip v-if="item.opcional === 'S'" color="primary">
                                Si
                              </v-chip>
                              <v-chip v-if="item.opcional === 'N'" color="accent">
                                No
                              </v-chip>
                            </!--template-->
                            <template #[`item.juridico`]="{ item }">
                              <v-icon dark color="primary" v-if="item.juridico === 'N'">
                                {{ icons.mdiAccountTie }}
                              </v-icon>
                              <v-icon dark color="primary" v-else>
                                {{ icons.mdiScaleBalance }}
                              </v-icon>
                            </template>
              
                            <template #[`item.tipo`]="{ item }">
                              <v-chip v-if="item.tipo === 'I'" color="accent">
                                Imagen
                              </v-chip>
                              <v-chip v-if="item.tipo === 'T'" color="warning">
                                Texto
                              </v-chip>
                            </template>
              
                            <template #[`item.habilitado`]="{ item }">
                              <v-switch v-model="item.habilitado" @change="actualizarEstatusDoc(item)" />
                            </template>
              
                            <template #[`item.acciones`]="{ item }">
                              <v-btn icon dark color="primary" @click="openEditarDoc(item)">
                                <v-icon>{{ icons.mdiPencil }}</v-icon>
                              </v-btn>
                              <v-btn icon dark color="#E53935" @click="openDeleteDoc(item)">
                                <v-icon>{{ icons.mdiDelete }}</v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <!-- Bancos por País-->
                <v-col cols="8" class="mb-6">
                  <v-card>
                    <v-card-title>
                      Bancos por País
                      <v-spacer />
                      <v-btn icon @click="dialogBanco= true">
                        <v-icon dark color="primary" v-if="usersAdmin.escribir">
                          {{ icons.mdiBankPlus }}
                        </v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-row class="ma-0">
                        <v-col sm="12">
                          <v-data-table :headers="headersBanco" :items="dataBanco" :items-per-page="5" :search="search"
                            class="elevation-1">
              
                            <template #[`item.habilitado`]="{ item }">
                              <v-switch v-model="item.habilitado" @change="actualizarEstatusBanco(item)" />
                            </template>
              
                            <template #[`item.acciones`]="{ item }">
                              <v-btn icon dark color="primary" @click="openEditarBanco(item)">
                                <v-icon>{{ icons.mdiPencil }}</v-icon>
                              </v-btn>
                              <v-btn icon dark color="#E53935" @click="openDeleteBanco(item)">
                                <v-icon>{{ icons.mdiDelete }}</v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <!---- Servicios CUENTAS por País-->
                <v-col cols="12" class="mb-6">
                  <v-card>
                    <v-card-title>
                      Cuentas FIAT de Defix por País
                      <v-spacer />
                      <v-btn icon @click="dialogCuenta = true">
                        <v-icon dark color="primary" v-if="usersAdmin.escribir">
                          {{ icons.mdiCashPlus }}
                        </v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-row class="ma-0">
                        <v-col sm="12">
                          <v-data-table :headers="headersCuenta" :items="dataCuenta" :items-per-page="10" :search="search"
                            class="elevation-1">
              
                            <template #[`item.habilitado`]="{ item }">
                              <v-switch v-model="item.habilitado" @change="actualizarEstatusCuenta(item)" />
                            </template>
              
                            <template #[`item.acciones`]="{ item }">
                              <v-btn icon dark color="primary" @click="openEditarCuenta(item)">
                                <v-icon>{{ icons.mdiPencil }}</v-icon>
                              </v-btn>
                              <v-btn icon dark color="#E53935" @click="openDeleteCuenta(item)">
                                <v-icon>{{ icons.mdiDelete }}</v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG EDITAR PAIS-->

    <!-- DIALOG CREAR DOCUMENTO PAIS-->
    <v-dialog
      v-model="dialogDoc"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            dark
            icon
            class="white--text"
            @click="dialogDoc = false"
          >
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Crear nuevo Documento por País</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-6">
                <v-text-field
                  v-model="nombre"
                  outlined
                  label="Documento"
                  placeholder="Descripción del Documento"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col> 
              <v-col class="col-6 ">
                <v-select
                  v-model="tipo"
                  :items="items"
                  item-text="text"
                  item-value="value"
                  label="Tipo de DOCUMENTO"
                  outlined
                  dense
                />
              </v-col> 
              <v-col class="col-6">
                <v-text-field
                  v-model="detalle"
                  outlined
                  label="Detalle del Documento"
                  placeholder="Detalle del Documento"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col> 
              <!--v-col class="col-6 ">
                <v-select
                  v-model="opcional"
                  :items="itemsOpcional"
                  item-text="text"
                  item-value="value"
                  label="Opcional"
                  outlined
                  dense
                />
              </!--v-col-->
              <v-col class="col-6 ">
                <v-select
                  v-model="juridico"
                  :items="itemsJuridico"
                  item-text="text"
                  item-value="value"
                  label="Natural o Jurídico"
                  outlined
                  dense
                />
              </v-col>                           

              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialogDoc = false, createCountryDoc()"
              >
                Guardar
              </v-btn>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG CREAR DOCUMENTO X PAIS-->

    <!-- DIALOG EDITAR DOCUMENTO X PAIS-->
    <v-dialog
      v-model="dialogeditDoc"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-toolbar
          color="primary"
        >
          <v-btn
            dark
            icon
            class="white--text"
            @click="dialogeditDoc = false"
          >
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Edición de Documento por País</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-6">
                <v-text-field
                  v-model="registroDoc.nombre"
                  outlined
                  label="Documento"
                  placeholder="Documento"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-6 ">
                <v-select
                  v-model="registroDoc.tipo"
                  :items="items"
                  item-text="text"
                  item-value="value"
                  label="Tipo de DOCUMENTO"
                  outlined
                  dense
                />
              </v-col>

              <v-col class="col-6">
                <v-text-field
                  v-model="registroDoc.detalle"
                  outlined
                  label="Detalle del Documento"
                  placeholder="Detalle del Documento"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col> 
              <!--v-col class="col-6 ">
                <v-select
                  v-model="registroDoc.opcional"
                  :items="itemsOpcional"
                  item-text="text"
                  item-value="value"
                  label="Opcional"
                  outlined
                  dense
                />
              </!--v-col-->
              <v-col class="col-6 ">
                <v-select
                  v-model="registroDoc.juridico"
                  :items="itemsJuridico"
                  item-text="text"
                  item-value="value"
                  label="Natural o Jurídico"
                  outlined
                  dense
                />
              </v-col> 


              <v-col class="col-6 mb-0">
                <v-switch
                  v-model="registroDoc.habilitado"
                  label="El Documento esta habilitado?"
                  outlined
                  dense
                />
              </v-col> 

              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialogeditDoc = false, guardarEdicionDoc()"
              >
                Guardar
              </v-btn>

            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG EDITAR DOCUMENTO X PAIS-->

    <!-- DIALOG CREAR  servicio Cuenta PAIS-->
    <v-dialog
      v-model="dialogCuenta"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            dark
            icon
            class="white--text"
            @click="dialogCuenta = false"
          >
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Crear nueva Cuenta FIAT por País</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-6 ">
                <v-select
                  v-model="bancoId"
                  :items="dataBanco"
                  item-text="nombre"
                  item-value="id"
                  label="Bancos"
                  outlined
                  dense
                />
              </v-col>
              <v-col class="col-6 ">
                <v-select
                  v-model="tipopagoId"
                  :items="dataTipoPago"
                  item-text="nombre"
                  item-value="id"
                  label="Tipo de Pago"
                  outlined
                  dense
                />
              </v-col>
              <v-col class="col-6">
                <v-text-field
                  v-model="titular"
                  outlined
                  label="Titular"
                  placeholder="Nombre del titular"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>  
              <v-col class="col-6">
                <v-text-field
                  v-model="cedula"
                  outlined
                  label="Id"
                  placeholder="Nro. identidicacion"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>  
              <v-col class="col-6">
                <v-text-field
                  v-model="telefono"
                  outlined
                  label="Teléfono"
                  placeholder="Teléfono Titular"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>  
              <v-col class="col-6">
                <v-text-field
                  v-model="numerocuenta"
                  outlined
                  label="Número Cuenta"
                  placeholder="Número Cuenta"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>               
              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialogCuenta = false, createCountryCuenta()"
              >
                Guardar
              </v-btn>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG CREAR servicio Cuenta PAIS-->

    <!-- DIALOG EDITAR servicio Cuenta PAIS-->
    <v-dialog
      v-model="dialogeditCuenta"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-toolbar
          color="primary"
        >
          <v-btn
            dark
            icon
            class="white--text"
            @click="dialogeditCuenta = false"
          >
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Edición de Cuenta FIAT por País</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">

              <v-col class="col-6 ">
                <v-select
                  v-model="registroCuenta.bancoId"
                  :items="dataBanco"
                  item-text="nombre"
                  item-value="id"
                  label="Bancos"
                  outlined
                  dense
                />
              </v-col>
              <v-col class="col-6 ">
                <v-select
                  v-model="registroCuenta.tipopagoId"
                  :items="dataTipoPago"
                  item-text="nombre"
                  item-value="id"
                  label="Tipo de Pago"
                  outlined
                  dense
                />
              </v-col>
              <v-col class="col-6">
                <v-text-field
                  v-model="registroCuenta.titular"
                  outlined
                  label="Titular"
                  placeholder="Nombre del titular"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>  
              <v-col class="col-6">
                <v-text-field
                  v-model="registroCuenta.cedula"
                  outlined
                  label="Id"
                  placeholder="Nro. identidicacion"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>  
              <v-col class="col-6">
                <v-text-field
                  v-model="registroCuenta.telefono"
                  outlined
                  label="Teléfono"
                  placeholder="Teléfono Titular"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>  
              <v-col class="col-6">
                <v-text-field
                  v-model="registroCuenta.numerocuenta"
                  outlined
                  label="Número Cuenta"
                  placeholder="Número Cuenta"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>              
              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialogeditCuenta = false, guardarEdicionCuenta()"
              >
                Guardar
              </v-btn>

            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG EDITAR servicio cuenta PAIS-->    

    <!-- DIALOG CREAR  bancos x  PAIS-->
    <v-dialog
      v-model="dialogBanco"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            dark
            icon
            class="white--text"
            @click="dialogBanco= false"
          >
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Crear nuevo Banco País</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-6">
                <v-text-field
                  v-model="nombre"
                  outlined
                  label="Institución Financiera"
                  placeholder="Institución Financiera"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>  
              <v-col class="col-6">
                <v-text-field
                  v-model="codigo"
                  outlined
                  label="Código del Banco"
                  placeholder="Código del Banco"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>  
              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialogBanco = false, createCountryBanco()"
              >
                Guardar
              </v-btn>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG CREAR bancos X PAIS-->

    <!-- DIALOG EDITAR bancos X PAIS-->
    <v-dialog
      v-model="dialogeditBanco"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-toolbar
          color="primary"
        >
          <v-btn
            dark
            icon
            class="white--text"
            @click="dialogeditBanco = false"
          >
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Edición de Bancos por País</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-row class="ma-0 pb-5 px-2">
              <v-col class="col-6">
                <v-text-field
                  v-model="registroBanco.nombre"
                  outlined
                  label="Institución Financiera"
                  placeholder="Institución Financiera"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-6">
                <v-text-field
                  v-model="registroBanco.codigo"
                  outlined
                  label="Código del Banco"
                  placeholder="Código del Banco"
                  hide-details
                  class="mb-3"
                  dense
                />
              </v-col>
              <v-col class="col-6 mb-0">
                <v-switch
                  v-model="registroBanco.habilitado"
                  label="El Banco esta habilitado?"
                  outlined
                  dense
                />
              </v-col> 

              <v-btn
                block
                color="primary"
                class="mt-6"
                @click="dialogeditBanco = false, guardarEdicionBanco()"
              >
                Guardar
              </v-btn>

            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG EDITAR bancos X PAIS-->

    <!-- DIALOG DE CARGA -->
    <v-dialog
      v-model="dialogWait"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Por favor espere
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG DE CARGA -->

    <!-- DIALOG DELETE SURE -->
    <v-dialog
      v-model="dialogSure"
      max-width="290"
      transition="dialog-top-transition"
    >
      <v-card>
        <v-card-title class="text-h5">
          <span class="red--text text--lighten-1">Eliminar registro</span>
          
        </v-card-title>

        <v-card-text>
          Esta seguro que va a eliminar este registro?
          <p>No podra recuperarlo</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="#E53935"
            text
            @click="eliminar(item)"
          >
            Eliminar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialogSure = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- DIALOG DELETE SURE -->

    <!-- DIALOG DELETE DOCUMENROS X PAIS -->
    <v-dialog
      v-model="dialogSureDoc"
      max-width="290"
      transition="dialog-top-transition"
    >
      <v-card>
        <v-card-title class="text-h5">
          <span class="red--text text--lighten-1">Eliminar registro</span>
          
        </v-card-title>

        <v-card-text>
          Esta seguro que va a eliminar este registro?
          <p>No podra recuperarlo</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="#E53935"
            text
            @click="eliminarDoc(item)"
          >
            Eliminar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialogSureDoc = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG DELETE DOCUMENTO X PAIS -->
 
   
    <!-- DIALOG DELETE servicios Cuenta X PAIS -->
    <v-dialog
      v-model="dialogSureCuenta"
      max-width="290"
      transition="dialog-top-transition"
    >
      <v-card>
        <v-card-title class="text-h5">
          <span class="red--text text--lighten-1">Eliminar registro</span>
          
        </v-card-title>

        <v-card-text>
          Esta seguro que va a eliminar este registro?
          <p>No podra recuperarlo</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="#E53935"
            text
            @click="eliminarCuenta(item)"
          >
            Eliminar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialogSureCuenta = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG DELETE servicios Cuenta X PAIS -->     

    <!-- DIALOG DELETE banco X PAIS -->
    <v-dialog
      v-model="dialogSureBanco"
      max-width="290"
      transition="dialog-top-transition"
    >
      <v-card>
        <v-card-title class="text-h5">
          <span class="red--text text--lighten-1">Eliminar registro</span>
          
        </v-card-title>

        <v-card-text>
          Esta seguro que va a eliminar este registro?
          <p>No podra recuperarlo</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="#E53935"
            text
            @click="eliminarBanco(item)"
          >
            Eliminar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialogSureBanco = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- FIN DIALOG DELETE bancos X PAIS --> 

    <!-- SNACKBAR MENSAJES -->
    <v-snackbar
      v-model="snackbar"
      right
      top
      absolute
      :color="color"
      :multi-line="multiLine"
      elevation="24"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <!-- FIN SNACKBAR -->
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiAccountPlus,
  mdiEyeOutline,
  mdiEyeOffOutline,
  mdiClose,
  mdiPencil,
  mdiDelete,
  mdiTextBoxPlusOutline  ,
  mdiEarthPlus ,
  mdiCashPlus ,
  mdiCheckCircle,
  mdiCancel ,
  mdiScaleBalance,
  mdiAccountTie ,
  mdiBankPlus,
  mdiContentDuplicate,
  } from '@mdi/js'
import { ref } from '@vue/composition-api'


export default {
  data() {
    return {
      snackbar: false,
      text: '',
      color: '',
      search: '',
      headers: [
        { text: 'País', value: 'nombre'},
        { text: 'Moneda', value: 'coin'},
        { text: 'Bandera', value: 'imagen'},
        { text: 'Activo', value: 'habilitado'},
        { text: 'Valida KYC Venta', value: 'kycventa'},
        { text: 'Valida KYC Compra', value: 'kyccompra'},
        //{ text: 'Monto Mínimo Venta',  value: 'montoventa',  align: 'right'},
        //{ text: 'Monto Mínimo Compra', value: 'montocompra', align: 'right'},
        { text: 'Acciones', value: 'acciones'},
      ],data:[],
      headersDoc: [
        { text: 'Documento', value: 'nombre'},
        { text: 'Tipo', value: 'tipo'},
        { text: 'Detalle', value: 'detalle'},
        //{ text: 'Opcional', value: 'opcional'},
        { text: 'Jurídico', value: 'juridico'},
        { text: 'Estatus' , value: 'habilitado'},
        { text: 'Acciones', value: 'acciones'},
      ],dataDoc:[],
      tipo: '',
      items: [
        { text: 'Imagen', value: 'I' },
        { text: 'Texto', value: 'T' },
      ],
      itemsOpcional: [
        { text: 'Si', value: 'S' },
        { text: 'No', value: 'N' },
      ],
      itemsJuridico: [
        { text: 'Natural', value: 'N' },
        { text: 'Juridíco', value: 'J' },
      ],
      headersCuenta: [
        { text: 'Banco', value: 'banco'},
        { text: 'Tipo de Pago', value: 'tipopago'},
        { text: 'Titular' , value: 'titular'},
        { text: 'Cédula (ID)', value: 'cedula'},
        { text: 'Número de Cuenta' , value: 'numerocuenta'},
        { text: 'Estatus' , value: 'habilitado'},
        { text: 'Acciones', value: 'acciones'},
      ],dataCuenta:[], 
      headersBanco: [
        { text: 'Nombre', value: 'nombre'},
        { text: 'Código', value: 'codigo'},
        { text: 'Estatus' , value: 'habilitado'},
        { text: 'Acciones', value: 'acciones'},
      ],dataBanco:[],
        
      dataTipoPago:[], 
      isPasswordVisible: false,
      dialog: false,
      dialog_edit:false,
      dialogDoc: false,
      dialogeditDoc:false,
      dialogCuenta: false,
      dialogeditCuenta:false,      
      dialogBanco: false,
      dialogeditBanco:false,
      id: '',
      nombre: '',
      coin: '',
      tasa: '',
      imagen: '',
      detalle:'',
      opcional:'S',
      juridico:'',
      kycventa:true,
      kyccompra:true,
      montoventa:0,
      montocompra:0,
      bancoId:'',
      tipopagoId:'',
      titular:'',
      cedula:'',
      telefono:'',
      numerocuenta:'',

      registro:{
        id:'',
        nombre:'',
        coin: '',
        tasa: '',
        imagen:'',
        kycventa:'',
        kyccompra:'',
        montoventa:0,
        montocompra:0,
      },
      registroDoc:{
        id:'',
        nombre:'',
        tipo:'',
        detalle:'',
        opcional:'S',
        juridico:'',
      },
      registroCuenta:{
        id:'',
        bancoId:'',
        tipopagoId:'',
        titular:'',
        cedula:'',
        telefono:'',
        numerocuenta:'',
      },      
      registroBanco:{
        id:'',
        nombre:'',
        codigo:'',
      },
     // tipo: '',
      permisosUser: JSON.parse(localStorage.permisos),
      usersAdmin: [],
      dialogWait: false,
      dialogSure: false,
      dataDelete: [],
      dialogSureDoc: false,
      dataDeleteDoc: [],
      dialogSureCuenta: false,
      dataDeleteCuenta: [],
      dialogSureBanco: false,
      dataDeleteBanco: [],
      icons: {
        mdiAccountPlus,
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiClose,
        mdiPencil,
        mdiDelete,
        mdiTextBoxPlusOutline  ,
        mdiEarthPlus ,
        mdiCashPlus ,
        mdiCheckCircle,
        mdiCancel ,
        mdiScaleBalance,
        mdiAccountTie ,
        mdiBankPlus,
      },
    }
  },
  mounted() {
    this.permisosUser.forEach(i => {
      if (i.modulo === 'UsersAdmin') {
        this.usersAdmin = i
     }
    })
   console.log(this.usersAdmin)
    this.fecthData()
  },
  methods: {
    Preview_image() {
      if (this.registro.imagen){
        this.url= URL.createObjectURL(this.registro.imagen)
      }
      else{
        console.log(err)
        this.url = null
      }
    },
    fecthData () {
      this.dialogWait = true
      this.axios.get('/paises/').then(response => {
          this.data = response.data
          this.dialogWait = false
        }).catch(err => {
          console.log(err)
        })
    },
    fecthDataDoc (id) {
      this.axios.get('/paisesdoc/?pais='+id).then(response => {
          this.dataDoc = response.data
          //this.fecthData()
        }).catch(err => {
          console.log(err)
        })
    },
    fecthDataCuenta (id) {
          this.axios.get('/get-tcuenta-defix/'+id+'').then(response => {
          this.dataCuenta = response.data
          //this.fecthData()
        }).catch(err => {
          console.log(err)
        })
    },
    fecthDataBanco (id) {
      this.axios.get('/paisbanco/?pais='+id).then(response => {
          this.dataBanco = response.data
          //this.fecthData()
        }).catch(err => {
          console.log(err)
        })
        this.axios.get('/tipopago/').then(response => {
          this.dataTipoPago = response.data
          //this.fecthData()
        }).catch(err => {
          console.log(err)
        })
    },
    createCountry() {
      const formData = new FormData()
      formData.append('imagen', this.registro.imagen)
      formData.append('nombre', this.nombre)
      formData.append('coin', this.coin)
      formData.append('tasa', this.tasa)
      formData.append('kycventa', this.kycventa)
      formData.append('kyccompra', this.kyccompra)
      formData.append('montoventa',  this.montoventa)
      formData.append('montocompra', this.montocompra)
      console.log('lola',formData)
      this.axios.post('/paises/', formData).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se guardo correctamente'
        this.imagen= ''
        this.nombre= ''
        this.coin= ''
        this.tasa= ''
        this.kycventa= true
        this.kyccompra= true
        this.montocompra= 0
        this.montoventa= 0
        this.fecthData()
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },
    createCountryDoc () {
      const data = {
        tipo: this.tipo,
        nombre: this.nombre,
        detalle: this.detalle,
        opcional: this.opcional,
        juridico: this.juridico,
        pais: this.registro.id,
      }
      console.log(data)
      this.axios.post('/paisesdoc/', data).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se guardo correctamente'
        this.tipo = ''
        this.nombre = ''
        this.detalle = ''
        this.opcional = 'S'
        this.juridico = ''
        this.fecthDataDoc(this.registro.id)
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },
    createCountryCuenta () {
      const data = {
        banco:this.bancoId,
        tipopago:this.tipopagoId,
        titular:this.titular,
        cedula:this.cedula,
        telefono:this.telefono,
        numerocuenta:this.numerocuenta,
        pais: this.registro.id,
      }
      console.log('lola',data)
      this.axios.post('/kyccuentadefix/', data).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se guardo correctamente'
        this.bancoId = ''
        this.tipopagoId = ''
        this.titular = ''
        this.cedula = ''
        this.telefono = ''
        this.numerocuenta = ''
        this.fecthDataCuenta(this.registro.id)
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },         
    createCountryBanco () {
      const data = {
        nombre: this.nombre,
        codigo: this.codigo,
        pais: this.registro.id,
      }
      console.log(data)
      this.axios.post('/paisbanco/', data).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se guardo correctamente'
        this.nombre= ''
        this.codigo= ''
        this.fecthDataBanco(this.registro.id)
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },
    uploadBandera(){
      const formData = new FormData()
      formData.append('imagen', this.registro.imagen)
      this.$axios.$patch('/paises/'+this.id+'/', formData,{
        headers: {"Content-Type": "multipart/form-data",},
      }).then((res)=>{
        this.$toast.success('Registro exitoso')
      }).catch((error) => {
        this.$toast.error('Error en el registro de dato')
        console.error(error)
      })
    },
    actualizarEstatus(item){     
      this.axios.patch('/paises/'+ item.id + '/', {'habilitado':item.habilitado}).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo el estatus correctamente'
        this.fecthData()
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },
    actualizarEstatusDoc(item){  
      this.axios.patch('/paisesdoc/'+ item.id + '/', {'habilitado':item.habilitado}).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo el estatus correctamente'
        this.fecthDataDoc(this.registro.id)
        
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },
    actualizarEstatusCuenta(item){  
        this.axios.patch('/kyccuentadefix/'+ item.id + '/', {'habilitado':item.habilitado}).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo el estatus correctamente'
        this.fecthDataCuenta(this.registro.id)
        
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },
    actualizarEstatusBanco(item){  
        this.axios.patch('/paisbanco/'+ item.id + '/', {'habilitado':item.habilitado}).then((res) => {
        console.log(res.data)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo el estatus correctamente'
        this.fecthDataBanco(this.registro.id)
        
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error ' + err
      });
    },
    openEditar(item){
      console.log(item)
      this.dialog_edit = true
      this.registro.id = item.id
      this.registro.nombre = item.nombre
      this.registro.coin = item.coin
      this.registro.tasa = item.tasa
      this.registro.imagen = item.imagen
      this.registro.habilitado = item.habilitado
      this.registro.kycventa = item.kycventa
      this.registro.montocompra = item.montocompra
      this.registro.montoventa  = item.montoventa
      this.registro.kyccompra = item.kyccompra
      this.fecthDataDoc(item.id)
      this.fecthDataCuenta(item.id)
      this.fecthDataBanco(item.id)
    },
    openEditarDoc(item){
      console.log(item)
      this.dialogeditDoc = true
      this.registroDoc.id = item.id
      this.registroDoc.nombre = item.nombre
      this.registroDoc.tipo = item.tipo
      this.registroDoc.detalle = item.detalle
      this.registroDoc.opcional = item.opcional
      this.registroDoc.juridico = item.juridico
      this.registroDoc.habilitado = item.habilitado
    },
    openEditarCuenta(item){
      console.log(item)
      this.dialogeditCuenta = true
      this.registroCuenta.id = item.id
      this.registroCuenta.bancoId = item.bancoId
      this.registroCuenta.tipopagoId = item.tipopagoId
      this.registroCuenta.titular = item.titular
      this.registroCuenta.cedula = item.cedula
      this.registroCuenta.telefono = item.telefono
      this.registroCuenta.numerocuenta = item.numerocuenta
      this.registroCuenta.habilitado = item.habilitado
    },
    openEditarBanco(item){
      console.log(item)
      this.dialogeditBanco = true
      this.registroBanco.id = item.id
      this.registroBanco.nombre = item.nombre
      this.registroBanco.codigo = item.codigo
      this.registroBanco.habilitado = item.habilitado
    },
    guardarEdicion() {
        const formData = new FormData()
        formData.append('nombre', this.registro.nombre)
        formData.append('coin', this.registro.coin)
        formData.append('tasa', this.registro.tasa)
        formData.append('habilitado', this.registro.habilitado)
        formData.append('kycventa', this.registro.kycventa)
        formData.append('kyccompra', this.registro.kyccompra)
        formData.append('montoventa',  this.registro.montoventa)
        formData.append('montocompra', this.registro.montocompra)
        if (this.registro.imagen.lastModified){
          formData.append('imagen', this.registro.imagen)
        }
        this.axios.patch('/paises/'+ this.registro.id + '/', formData).then((res) => {
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo correctamente'
        this.fecthData()
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      });
    },
    guardarEdicionDoc() {
        const formData = new FormData()
        formData.append('nombre', this.registroDoc.nombre)
        formData.append('habilitado', this.registroDoc.habilitado)
        formData.append('tipo', this.registroDoc.tipo)
        formData.append('detalle', this.registroDoc.detalle)
        formData.append('opcional', this.registroDoc.opcional)
        formData.append('juridico', this.registroDoc.juridico)
        this.axios.patch('/paisesdoc/'+ this.registroDoc.id + '/', formData).then((res) => {
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo correctamente'
        this.fecthDataDoc(this.registro.id)
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      });
    },
    guardarEdicionCuenta() {
        const formData = new FormData()
        formData.append('banco', this.registroCuenta.bancoId)
        formData.append('tipopago', this.registroCuenta.tipopagoId)
        formData.append('titular', this.registroCuenta.titular)
        formData.append('cedula', this.registroCuenta.cedula)
        formData.append('telefono', this.registroCuenta.telefono)
        formData.append('numerocuenta', this.registroCuenta.numerocuenta)
        formData.append('habilitado', this.registroCuenta.habilitado)
        this.axios.patch('/kyccuentadefix/'+ this.registroCuenta.id + '/', formData).then((res) => {
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo correctamente'
        this.fecthDataCuenta(this.registro.id)
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      });
    },
    guardarEdicionBanco() {
        const formData = new FormData()
        formData.append('nombre', this.registroBanco.nombre)
        formData.append('codigo', this.registroBanco.codigo)
        formData.append('habilitado', this.registroBanco.habilitado)
        this.axios.patch('/paisbanco/'+ this.registroBanco.id + '/', formData).then((res) => {
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se actualizo correctamente'
        this.fecthDataBanco(this.registro.id)
      }).catch((err) => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      });
    },
    openDelete (item) {
      this.dataDelete = item
      this.dialogSure = true
    },
    openDeleteDoc (item) {
      this.dataDeleteDoc = item
      this.dialogSureDoc = true
    },
    openDeleteCuenta (item) {
      this.dataDeleteCuenta = item
      this.dialogSureCuenta = true
    },
    openDeleteBanco (item) {
      this.dataDeleteBanco = item
      this.dialogSureBanco = true
    },
    eliminar () {
      this.dialogSure = false
      this.axios.delete('/paises/' + this.dataDelete.id + '/').then(res => {
        console.log(res)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se elimino correctamente'
        this.fecthData()
      }).catch(err => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      })
    },
    eliminarDoc () {
      this.dialogSureDoc = false
      this.axios.delete('/paisesdoc/' + this.dataDeleteDoc.id + '/').then(res => {
        console.log(res)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se elimino correctamente'
        this.fecthDataDoc(this.registro.id)
      }).catch(err => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      })
    },

    eliminarCuenta () {
      this.dialogSureCuenta = false
      this.axios.delete('/kyccuentadefix/' + this.dataDeleteCuenta.id + '/').then(res => {
        console.log(res)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se elimino correctamente'
        this.fecthDataCuenta(this.registro.id)
      }).catch(err => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      })
    },
    eliminarBanco () {
      this.dialogSureBanco = false
      this.axios.delete('/paisbanco/' + this.dataDeleteBanco.id + '/').then(res => {
        console.log(res)
        this.snackbar = true
        this.color = 'primary'
        this.text = 'Se elimino correctamente'
        this.fecthDataBanco(this.registro.id)
      }).catch(err => {
        console.log(err)
        this.snackbar = true
        this.color = '#E53935'
        this.text = 'Ocurrio un error' + err
      })
    }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
