# TODO: TOo much work dor this.. Just going to point the Apache directory to the build directory.s
import os
import shutil


def getallFiles(dir): return [f for f in os.listdir(dir) if os.path.isfile(os.path.join(dir, f))]


def isProductionfile(file, prod_files, prod_file_prefixs):
    if file in prod_files: return True
    elif file.startswith(prod_file_prefixs): return True
    else: return False


def copytoWebApp(file):
    source = os.path.join(new_production_files_dir, file)
    destination = os.path.join(live_webapp_dir, file)
    shutil.copyfile(source, destination)
    print(f'Copied file {source} -> {destination}')


def delete_file(file):
    file = os.path.join(live_webapp_dir, file)
    if fileExists(file):
        try:
            os.remove(file)
            print(f'√ Successfully removed: {file}')
        except Exception as e: print(f'[*] Something went wrong attempting to remove the file: {file}\n{e} [*]')
    else: print(f'[!] {file} not found')


def fileExists(file): return os.path.isfile(file)


if __name__ == '__main__':
    new_production_files_dir = '/root/WebApp/anonsys.tech/SPA/dist/SPA/'
    live_webapp_dir = '/home/anonsys/public_html/'
    # dir = os.path.dirname(os.path.realpath(__file__))

    old_webapp_files = getallFiles(live_webapp_dir)
    new_webapp_files = getallFiles(new_production_files_dir)

    prod_files = (
        '3rdpartylicenses.txt',
        'index.html',
    )
    prod_file_prefixs = (
        'main',
        'nebular',
        'polyfills',
        'runtime',
        'styles',
    )

    for file in old_webapp_files:
        if isProductionfile(file, prod_files, prod_file_prefixs):
            delete_file(file)
    for file in new_webapp_files:
        if isProductionfile(file, prod_files, prod_file_prefixs):
            copytoWebApp(file)


