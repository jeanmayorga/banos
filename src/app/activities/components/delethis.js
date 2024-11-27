console.log(`
<Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-8 grid grid-cols-8 rounded-3xl bg-white p-2 shadow-sm"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="col-span-3 space-y-0 border-r pr-4">
                  <FormLabel className="pl-3 text-gray-600">Fecha:</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="ghost"
                          className="w-full rounded-full pl-3 text-left font-normal text-gray-500"
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona una fecha:</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="z-10 w-auto rounded-3xl border bg-white p-4 shadow-sm"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="people"
              render={({ field }) => (
                <FormItem className="col-span-3 space-y-0 px-4">
                  <FormLabel className="pl-3 text-gray-600">Número de personas:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-full border-none text-gray-500 shadow-none hover:bg-gray-100">
                        <SelectValue placeholder="Número de personas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array(10).keys()].map((number) => (
                        <SelectItem key={number} value={String(number + 1)}>
                          {number + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="col-span-2 flex items-center">
              <Button className="w-full rounded-3xl bg-[#00a7ac] py-6">Búscar</Button>
            </div>
          </form>
        </Form>


`);
